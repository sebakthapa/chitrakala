import dbConnect from "@/lib/dbConnect";
import clientPromise from "@/lib/mongodb";
import Users from "@/models/useraccounts/users";
import UsersDetails from "@/models/useraccounts/usersDetail";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import bcrypt from "bcrypt"
import { MongoDBAdapter } from "@/lib/mongoDBAdapter";
import { createTransport } from "nodemailer";
import {  EmailVerifyHtml, emailVerifyText } from "@/lib/emailTemplates";
import VerificationTokens from "@/models/others/VerificationTokens";

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise, { databaseName: process.env.DATABASE_NAME }),
    pages: {
        signIn: "/auth/login",
        error: "auth/error"
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Email and Password",
            credentials: {
                loginID: { label: "Email/username/phone", type: "text", required: true, },
                password: { label: "Password", type: "password", required: true },
            },

            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const { loginID, password } = credentials;
                let query = "";
                const checkPasswordMatch = async (userPassword) => {
                    const result = await bcrypt.compare(password, userPassword);
                    return result
                }

                await dbConnect();
                let userIdField = "";

                if (loginID.indexOf("@") > 0) {
                    // login ID is email so search with email field
                    query = { email: loginID };
                    userIdField = "Email";
                } else if (/^[0-9]*$/.test(loginID)) {
                    // loginId is phone so search with phone field
                    query = { phone: loginID };
                    userIdField = "Phone";

                    if (loginID.length !== 10) {
                        // return new NextResponse(JSON.stringify({ field: "username/email/phone", message: "Please enter a valid phone number" }), { status: 401 })
                        throw new Error("Invalid Phone provided!", )

                    }
                } else {
                    // loginId is username so  search with username field
                    query = { username: loginID };
                    userIdField = "Username";

                }


                const user = await Users.findOne(query,);

                if (user?._id) {
                    // user exists check for the password field
                    if (await checkPasswordMatch(user.password)) {
                        const returnData = {
                            id: user._id,
                            isArtist: user.isArtist,
                            emailVerified: user.emailVerified,
                        }
                        return returnData;
                    } else {
                        // return new NextResponse(JSON.stringify({ field: "password", message: "Password is incorrect." }), { status: 401 })
                        throw new Error("Invalid credentials provided!")
                    }

                } else {
                    // return new NextResponse(JSON.stringify({ field: "username/email/phone", message: "Username doesn't exist" }), { status: 401 })
                    throw new Error(`${userIdField} does't exists!`)

                }

            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // authorization: {
            //     params: {
            //       prompt: "consent",
            //       access_type: "offline",
            //       response_type: "code"
            //     }
            //   },
            profile(profile) {
                const { email, email_verified, name, picture, sub } = profile;
                return {
                    email,
                    name,
                    isEmailVerified: email_verified,
                    id: sub,
                    isArtist: false,
                    image: picture,
                }
            },
        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                secure: true,
                service: process.env.SMTP_SERVICE,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                },
            },
            from: process.env.EMAIL_FROM,
            maxAge: 24 * 60 * 60, //in s
            async sendVerificationRequest({ identifier: email, url, provider: { server, from }, }) {
                const { host } = new URL(url)
                // NOTE: You are not required to use `nodemailer`, use whatever you want.
                const transport = createTransport(server)
                const result = await transport.sendMail({
                    to: email,
                    from: from,
                    subject: `Sign in to ${host}`,
                    text: emailVerifyText({ url, host }),
                    html: EmailVerifyHtml({ url, host }),
                })
                const failed = result.rejected.concat(result.pending).filter(Boolean)
                if (failed.length) {
                    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
                }
            },
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, // in seconds
    },

    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    database: process.env.MONGODB_URI, //

    callbacks: {
        async session({ session, token, user }) {

            session.user = token.user;
            const { id, emailVerified, isArtist } = session.user;
            session.user = { id, emailVerified, isArtist };
            return session;
        },

        async jwt({ token, user, trigger, ...rest }) {
            if (trigger == "update") {
                await dbConnect()
                const { isArtist, emailVerified, _id: id } = await Users.findById(token?.user.id).select("isArtist emailVerified")
                const userData = { isArtist, emailVerified, id }
                token.user = userData;
            }
            if (user) {
                token.user = user;
            }
            return token;
        },

        async signIn({ profile, account, metadata, email, ...props }) {
            if (account.provider == "email") {

                if (email?.verificationRequest) {
                    // check for no of verification tokens generated for that user. If it is large return too many reuest try later
                    try {
                        await dbConnect();
                        let res = await VerificationTokens.find({ identifier: account.userId }, { expires: 1, _id: 0 }).sort({ expires: "desc" });
                        // asc =>  token created first comes first so hourDiff(remaining validitiy time) of first token is least

                        //check if there are too many email links sent
                        const presentTime = new Date().valueOf();

                        const validTokens = [];
                        res?.forEach((object) => {
                            const expires = object.toObject().expires
                            const expireTime = new Date(expires).valueOf();
                            const hourDiff = Math.abs(presentTime - expireTime) / 1000 / 60 / 60;


                            if (hourDiff && hourDiff <= 24) {
                                validTokens.push(hourDiff)
                            }
                        });
                        const validTokenLength = validTokens.length;

                        if (validTokenLength > 1) { // validate frequent request only if at least one link is sent
                            let idealHourDiff = 0.15;
                            if (validTokenLength >= 15) {
                                return false;
                            } else if (validTokenLength >= 10) {
                                idealHourDiff = 1;  //
                            } else if (validTokenLength >= 5) {
                                idealHourDiff = 0.5;
                            } else if (validTokenLength >= 2) {
                                idealHourDiff = 0.2;
                            }

                            // diffHr goes in least to high
                            validTokens.forEach((diffHr) => { //diffHr = remaining validity time in hours / comes in asc
                                diffHr = 24 - diffHr; // diff hr changes to time in hour since token generated / comes in desc
                                if (diffHr <= idealHourDiff) {
                                    const waitTime = (idealHourDiff - diffHr) * 60;

                                    if (waitTime > 40) {
                                        throw "Too many frequent requests! Try again after about an hour."
                                    } else if (waitTime <= 40 && waitTime > 5) {
                                        const roundedMins = Math.ceil(waitTime / 5) * 5;
                                        throw `Too many frequent requests! Try again after ${roundedMins} minutes.`
                                    } else {
                                        const roundedMins = Math.ceil(waitTime);
                                        throw `Too many frequent requests! Try again after ${roundedMins} minutes.`
                                    }
                                }
                            })
                        }
                    } catch (error) {
                        throw error;
                    }
                } else {
                }
                return true;
            }
            if (account.provider != "email") {
                // if (account.provider == "google") {
                //     // //++++++++++++++++++++ Logic to redirect user to welcome page only on first signin
                //     await dbConnect();
                //     const res = await Users.findOne({ email: profile.email });
                //     if (res !== null) {
                //         return true
                //     } else{
                //         return {
                //             isNewUser: true,
                //         }
                //     }
                //     return true;
                // }
            }

            return true;
        },

        async redirect({ url, baseUrl }) {

            return url
        }

    },
}



const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }