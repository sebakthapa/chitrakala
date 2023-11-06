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
        }).populate({
            path: "user",
            select:"-password"
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
        const { user, bio, image, name, address : {country="", state="",city="", street=""}, dob } = details;
        
        const { email, phone, username, emailVerified } = user;
        
        if (bio && email && phone && name && username && image && country && state && city && street && dob && emailVerified) {
            return true;
        }
        return false;
    }

    try {
        console.log("try start")
        const  dataToUpdate = await request.json();

        await dbConnect();
        const params = request.url.split('/');
        const userId = params[params.length - 1];
        console.log("Before")
        const { bio, image, name, address, dob } = dataToUpdate;
        let country = "", state = "", city = "", street = "";
        if (address) {
            ({ country, state, city, street } = address);
        }
        console.log("After")
        
        const updatingData = {}
        
        if (bio) updatingData.bio = bio;
        if (image) updatingData.image = image;
        if (name) updatingData.name = name;
        if (dob) updatingData.dob = dob;
        console.log("before fisrt country")
        if (address) {
            updatingData.address = { country, state, city, street };
        }

        console.log("after fisrt country")
        
        console.log("before find and update")

        let res = await UsersDetails.findOneAndUpdate(
            { 'user': userId },
            updatingData,
            { new: true }
        )
        res = await res.populate({path: 'user',select: '-password'})
        console.log("after find and update")

        const isArtist = hasArtistDetails(res);

        if (isArtist) {
            const updatedUser = await Users.findByIdAndUpdate(userId, { isArtist });
            res.user = updatedUser;
        }

        return new NextResponse(JSON.stringify(res))

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