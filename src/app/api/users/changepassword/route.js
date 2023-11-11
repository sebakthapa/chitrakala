import dbConnect from "@/lib/dbConnect";
import { passwordResetSuccessHtml, passwordResetsuccessText } from "@/lib/emailTemplates";
import { sendEmail } from "@/lib/sendEmail";
import Users from "@/models/useraccounts/users";
import bcrypt from "bcrypt"
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const PATCH = async (request) => {
    const saltRounds = 10;
    const hashPassword = (password) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) reject(err)
                resolve(hash)
            })
        })
    }

    try {
        // checking for usersession as returned from header cookies from client request
        const token = await getToken({ req: request })
        if (!token?.user.id) {
            return NextResponse.json({ message: "You must be logged in to change your password." }, { status: 401 })
        }

        const { userId, currentPassword, newPassword, confirmNewPassword } = await request.json();

        if (token?.user.id != userId) {
            return NextResponse.json({ message: "You can change only your password." }, { status: 401 })
        }

        if (!newPassword || !currentPassword || !confirmNewPassword) {
            return new NextResponse(JSON.stringify({ field: "multiple", message: "One or more field data is missing." }), { status: 400, statusText: "bad request" })
        }

        if (newPassword != confirmNewPassword) {
            return new NextResponse(JSON.stringify({ field: "confirmnewpassword", message: "Confirm Password didn't match." }), { status: 400, statusText: "bad request" })
        }

        await dbConnect();

        const existingUser = await Users.findById(userId, { password: 1 });

        if (!existingUser) {
            return new NextResponse(JSON.stringify({ message: "User doesn't exist to perform the desired action." }), { status: 400, statusText: "bad request" })
        }

        if (!existingUser.password) {
            return new NextResponse(JSON.stringify({ field: "multiple", message: "You can change password only via email link." }), { status: 400, statusText: "bad request" })
        }


        const isPwCorrect = await bcrypt.compare(currentPassword, existingUser.password)
        if (!isPwCorrect) {
            return new NextResponse(JSON.stringify({ field: "currentpassword", message: "Incorrect password." }), { status: 401, statusText: "unauthorized" })
        }

        const hash = await hashPassword(newPassword);

        existingUser.password = hash;
        await existingUser.save()

        const {  host, origin } = new URL(req.url);
        const html = passwordResetSuccessHtml({  host:origin });
        const text = passwordResetsuccessText({  host:origin });
        const subject = `Password changed for ${host}`;

        const emailRes = await sendEmail({ subject, email, text, html })


        return new NextResponse(JSON.stringify({ message: "Password change successful!", status: 200, statusText: "ok" }))

    } catch (error) {
        console.log("ERROR while changing password for user \n" + error);
    }
}