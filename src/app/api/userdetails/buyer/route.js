import dbConnect, { closeConnection } from "@/lib/dbConnect";
import UserDetails from "@/models/buyer/usersDetail";
import { NextResponse } from "next/server";



// GET => GET userdetail

export const GET = async () => {

    try {
        await dbConnect("buyer");

        const res = await UserDetails.find({}).populate('user',{username:1,email:1,phone:1,_id:1});
        console.log(res)
        // const { username, _id: uid, email, phone="" } = res?.user;

        return new NextResponse(JSON.stringify(res))

    } catch (error) {
        console.log("ERROR fetching all buyer user detail \n" + error)
        return new NextResponse.json({ error: error })
    } finally {
        closeConnection("buyer");

    }
}



// POST => POST a product

export const POST = async (request) => {

    try {
        const { user, address = "", photo = "", displayName = "" } = await request.json();

        await dbConnect("buyer");
        s
        const newUserDetail = new UserDetails({ user, address, photo, displayName });

        const savedUserDetail = await newUserDetail.save();

        closeConnection("buyer");
        return new NextResponse(JSON.stringify(savedUserDetail))

    } catch (error) {
        console.log("ERROR while creating product \n" + error)
    }
}



