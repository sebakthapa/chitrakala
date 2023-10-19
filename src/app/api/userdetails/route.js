import dbConnect  from "@/lib/dbConnect";
import UserDetails from "@/models/useraccounts/usersDetail";
import { NextResponse } from "next/server";



// GET => GET userdetail

export const GET = async () => {

    try {
        await dbConnect();

        const res = await UserDetails.find({}).populate('user');
        console.log(res)

        return new NextResponse(JSON.stringify(res))

    } catch (error) {
        console.log("ERROR fetching all  user detail \n" + error)
        return new NextResponse.json({ error: error })
    } 
}



// POST => POST a product

export const POST = async (request) => {

    try {
        const { user, address = "", photo = "", displayName = "" } = await request.json();

        await dbConnect();
        
        const newUserDetail = new UserDetails({ user, address, photo, displayName });

        const savedUserDetail = await newUserDetail.save();

        return new NextResponse(JSON.stringify(savedUserDetail))

    } catch (error) {
        console.log("ERROR while creating product \n" + error)
    }
}



