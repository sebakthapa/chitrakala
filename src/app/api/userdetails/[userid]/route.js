import dbConnect from "@/lib/dbConnect";
import Users from "@/models/useraccounts/users";
import UsersDetails from "@/models/useraccounts/usersDetail";
import { NextResponse } from "next/server";



// GET => GET userdetail

export const GET = async (request) => {
    try {
        const params = request.url.split('/');
        console.log(params)
        const userId = params[params.length - 1];
        console.log(userId)
        if (!(userId?.length > 0)) {
            return new NextResponse(JSON.stringify({error: "Invalid User ID provided"}),{status:404})
        }
        await dbConnect();
        const res = await UsersDetails.findOne({
            'user': userId
        }).populate('user');


        return new NextResponse(JSON.stringify(res))

    } catch (error) {
        console.log("ERROR fetching user detail \n" + error)
        // return new NextResponse(error);
    }
}

// UPDATE => UPDATE a buyer detail

export const PATCH = async (request) => {
    const hasArtistDetails = (details) => {
        const { user, bio, image, name } = details;
        const { email, phone, username } = user;
        
        if (bio && email && phone && name && username && image) {
            return true;
        }
        return false;
    }

    try {
        const  dataToUpdate = await request.json();

        await dbConnect();
        const params = request.url.split('/');
        const userId = params[params.length - 1];

        const { bio, image, name } = dataToUpdate
        
        const updatingData = {}
        
        if (bio) updatingData.bio = bio;
        if (image) updatingData.image = image;
        if (name) updatingData.name = name;

        let res = await UsersDetails.findOneAndUpdate(
            { 'user': userId },
            updatingData,
            { new: true }
        )
        res = await res.populate({path: 'user',select: '-password'})

        const isArtist = hasArtistDetails(res);

        if (isArtist) {
            const updatedUser = await Users.findByIdAndUpdate(userId, { isArtist });
            res.user = updatedUser;
        }

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