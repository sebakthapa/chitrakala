import dbConnect from "@/lib/dbConnect";
import clientPromise from "@/lib/mongodb";
import Users from "@/models/useraccounts/users";
import UsersDetails from "@/models/useraccounts/usersDetail";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcrypt"
import { MongoDBAdapter } from "@/lib/mongoDBAdapter";

const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
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


                    const user = await Users.findOne(query);

                    if (user?._id) {
                        // console.log("user from authorize user", user)
                        // user exists check for the password field
                        if (await checkPasswordMatch(user.password)) {
                            const userDetails = await UsersDetails.findOne({ user: user._id }).populate("user", { username: 1, email: 1, phone: 1 })
                            console.log(userDetails)

                            const userData = {
                                id: userDetails.user._id,
                                isArtist: userDetails.user.isArtist,
                                emailVerified: false
                            }
                            // console.log("user Data", userData)
                            return userData;
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
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, // in seconds
    },

    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    // database: "", //
    callbacks: {
        async session({ session, token, user }) {
            console.log("FROM SeSSION CALLBACK", session)

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

        async signIn({ profile, account, metadata }) {
            if (account.provider == "google") {
                console.log("profile, profile", profile)

                // await dbConnect();
                // console.log("++++++++++++++++EMAIL", profile.email)
                // const res = await Users.findOne({ email: profile.email });
                // console.log("_______+++++++++++++_____________++++++++++\n RES \n", res)
                // // // console.log("_______+++++++++++++_____________++++++++++\n metadata \n", metadata)
                // if (res == null) {
                //     return "/artist"
                // }

                return true

            }
            // console.log("FROM SIGNIN CALLBACK+++++++++++++++++")

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