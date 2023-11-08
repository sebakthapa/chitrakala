import dbConnect from "@/lib/dbConnect";
import Users from "@/models/useraccounts/users";
import UsersDetails from "@/models/useraccounts/usersDetail";
import { NextResponse } from "next/server";



// GET => GET userdetail

export const GET = async (request) => {
    try {
        const params = request.url.split('/');
        // console.log(params)
        const userId = params[params.length - 1];
        // console.log(userId)
        if (!(userId?.length > 0)) {
            return new NextResponse(JSON.stringify({ error: "Invalid User ID provided" }), { status: 404 })
        }
        await dbConnect();
        const res = await UsersDetails.findOne({
            'user': userId
        }).populate({
            path: "user",
            select: "-password"
        });


        return new NextResponse(JSON.stringify(res))

    } catch (error) {
        console.log("ERROR fetching user detail \n" + error)
        // return new NextResponse(error);
    }
}



// UPDATE => UPDATE a buyer detail
export const PATCH = async (request) => {
    const hasArtistDetails = (details) => {
        const { user, bio, image, name, address, dob } = details;

        const { email, phone, username, emailVerified } = user;

        if (bio && email && phone && name && username && image && address && dob && emailVerified) {
            return true;
        }
        return false;
    }

    try {
        console.log("try start")
        const dataToUpdate = await request.json();

        await dbConnect();
        const params = request.url.split('/');
        const userId = params[params.length - 1];
        const { bio, image, name, address, dob, username, phone, } = dataToUpdate;

        const newUserDetails = { bio, image, name, address, dob };
        const newUser = { username, phone };

        let userRes, userDetailsRes;
        if (Object.keys(newUser)?.length > 0) {
            userRes = await Users.findByIdAndUpdate(userId, newUser, { new: true })
        }

        if (userRes) {
            if (Object.keys(newUserDetails)?.length > 0) {
                userDetailsRes = await UsersDetails.findOneAndUpdate({ 'user': userId }, newUserDetails,
                    { new: true, }
                ).populate({ path: 'user', select: '-password' })
            }
        }

        // userDetailsRes = await userDetailsRes.populate({ path: 'user', select: '-password' })

        // console.log("after find and update")
        const wasArtist = userDetailsRes?.user?.isArtist;

        const isArtist = hasArtistDetails(userDetailsRes);
        if (isArtist != wasArtist) {
            const updatedUser = await Users.findByIdAndUpdate(userId, { isArtist }, { new: true });

            res.user = updatedUser;
        }


        return new NextResponse(JSON.stringify(userDetailsRes))
    } catch (error) {
        console.log("ERROR while patching userdetails \n" + error)
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

//