import dbConnect from "@/lib/dbConnect";
import UsersDetails from "@/models/useraccounts/usersDetail";
import { NextResponse } from "next/server";



// GET => GET userdetail

export const GET = async (request) => {

    try {
        const params = request.url.split('/');
        const userId = params[params.length - 1];
        await dbConnect();
        const res = await UsersDetails.findOne({
            'user': userId
        }).populate('user');


        return new NextResponse(JSON.stringify(res))

    } catch (error) {
        console.log("ERROR fetching user detail \n" + error)
        return new NextResponse(error);
    }
}

// UPDATE => UPDATE a buyer detail

export const PATCH = async (request) => {

    try {
        const { address = "", displayName = "", photo = "" } = await request.json();

        await dbConnect();
        const params = request.url.split('/');
        const userId = params[params.length - 1];

        const res = await UsersDetails.findOneAndUpdate(
            { 'user': userId },
            { address, displayName, photo },
            { new: true }
        )

        return new NextResponse(JSON.stringify(res))

    } catch (error) {
        console.log("ERROR while creating product \n" + error)
    }

}


// DELETE => DELETE a buyer detail

export const DELETE = async (request) => {

    try {
        const userDetailData = await request.json();

        await dbConnect();
        const params = request.url.split('/');
        const userId = params[params.length - 1];

        const res = await UsersDetails.deleteOne(
            { 'user': userId }
        )

        return new NextResponse(JSON.stringify(res))

    } catch (error) {
        console.log("ERROR while creating product \n" + error)
    }

}