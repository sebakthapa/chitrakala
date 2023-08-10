// login handler

import dbConnect from "@/lib/dbConnect";
import Users from "@/models/buyer/users";
import UsersDetails from "@/models/buyer/usersDetail";
import { NextResponse } from "next/server";


export const POST = async (request) => {
    try {
        const { loginID, password } = await request.json();
        let query = "";

        const checkPasswordMatch = (userPassword) => {
            if (userPassword == password) {
                return true;
            }
            return false;
        }

        await dbConnect("buyer");

        if (loginID.indexOf("@") > 0) {
            // login ID is email so search with email field
            query = { email: loginID };
        } else if (/^[0-9]*$/.test(loginID)) {
            // loginId is phone so search with phone field
            query = { phone: loginID };
            if (loginID.length !== 10) {
                return new NextResponse(JSON.stringify({ field: "username/email/phone", message: "Please enter a valid phone number" }), { status: 401 })
            }
        } else {
            // loginId is username so  search with username field
            query = { username: loginID };
        }


        const user = await Users.findOne(query);

        if (user?._id) {
            // user exists check for the password field
            if (checkPasswordMatch(user.password)) {
                const userDetails = await UsersDetails.findOne({ user: user._id }).populate("user", { username: 1, email: 1, phone: 1 })
                return new NextResponse(JSON.stringify(userDetails))
            } else {
                return new NextResponse(JSON.stringify({ field: "password", message: "Password is incorrect." }), { status: 401 })
            }


        } else {
            return new NextResponse(JSON.stringify({ field: "username/email/phone", message: "Username doesn't exist" }), { status: 401 })
        }


    } catch (error) {
        console.log("ERROR trying to login" + error)
    }
}