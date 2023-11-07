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
import { html, text } from "@/lib/email";

const authOptions = {
    adapter: MongoDBAdapter(clientPromise, { databaseName: "projectData" }),
    pages: {
        signIn: "/auth/login"
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
                // console.log("CREDENTIALS__________________________",{loginID, password})
                try {
                    let query = "";
                    const checkPasswordMatch = async (userPassword) => {
                        const result = await bcrypt.compare(password, userPassword);
                        return result
                    }

                    await dbConnect();

                    if (loginID.indexOf("@") > 0) {
                        // login ID is email so search with email field
                        query = { email: loginID };
                    } else if (/^[0-9]*$/.test(loginID)) {
                        // loginId is phone so search with phone field
                        query = { phone: loginID };
                        if (loginID.length !== 10) {
                            // return new NextResponse(JSON.stringify({ field: "username/email/phone", message: "Please enter a valid phone number" }), { status: 401 })
                            throw new Error(JSON.stringify({ errors: "Invalid Phone", message: "Please enter a valid phone number", status: false, field: "username/email/phone" }))
                        }
                    } else {
                        // loginId is username so  search with username field
                        query = { username: loginID };
                    }


                    const user = await Users.findOne(query,);
                    console.log("USER FROM CREDENTIALS", user)

                    if (user?._id) {
                        // user exists check for the password field
                        if (await checkPasswordMatch(user.password)) {
                            // console.log(userDetails)
                            const returnData = {
                                id: user._id,
                                isArtist: user.isArtist,
                                emailVerified: user.emailVerified,
                            }
                            console.log("user Data", returnData)
                            return returnData;  
                        } else {
                            // return new NextResponse(JSON.stringify({ field: "password", message: "Password is incorrect." }), { status: 401 })
                            throw new Error(JSON.stringify({ errors: "Invalid Password", message: "Password is incorrect", status: false, field: "password" }))
                        }

                    } else {
                        // return new NextResponse(JSON.stringify({ field: "username/email/phone", message: "Username doesn't exist" }), { status: 401 })
                        throw new Error(JSON.stringify({ errors: "Invalid Username", message: "Username doesn't exist", status: false, field: "username/email/phone" }))
                    }

                } catch (error) {
                    // console.log("ERROR trying to login" + error)
                    return null
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
                // console.log("PROFILE FROM PROFIE CALLBACK OF GOOGLE", profile)
                const { email, email_verified, name, picture, sub } = profile;
                // console.log("Email Verified", email_verified)
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
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                },
            },
            from: process.env.EMAIL_FROM,
            async sendVerificationRequest({ identifier: email, url, provider: { server, from }, }) {
                const { host } = new URL(url)
                // NOTE: You are not required to use `nodemailer`, use whatever you want.
                const transport = createTransport(server)
                const result = await transport.sendMail({
                    to: email,
                    from: from,
                    subject: `Sign in to ${host}`,
                    text: text({ url, host }),
                    html: html({ url, host }),
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
            // console.log("FROM SeSSION CALLBACK", session)

            session.user = token.user;
            const { id, emailVerified, isArtist } = session.user;
            session.user = { id, emailVerified, isArtist };
            return session;
        },

        async jwt({ token, user }) {
            // console.log("FROM JWT CALLBACK", user)
            if (user) {
                token.user = user;
            }
            return token;
        },

        async signIn({ profile, account, metadata, }) {
            if (account.provider != "email") {
                if (account.provider == "google") {
                    // //++++++++++++++++++++ Logic to redirect user to welcome page only on first signin
                    // await dbConnect();
                    // console.log("++++++++++++++++EMAIL", profile.email)
                    // const res = await Users.findOne({ email: profile.email });
                    // console.log("_______+++++++++++++_____________++++++++++\n RES \n", res)
                    // // // console.log("_______+++++++++++++_____________++++++++++\n metadata \n", metadata)
                    // if (res == null) {
                    //     return "/profile-setup?step=welcome"
                    // }
                }
            }

            return true;
        },

        async redirect({ url, baseUrl }) {

            // console.log("CONSOLONG FROM REDIRECT", { url, baseUrl });
            return url
        }

    },
}



const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }