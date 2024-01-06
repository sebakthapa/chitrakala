import dbConnect from "@/lib/dbConnect";
import Users from "@/models/users/users";
import UsersDetails from "@/models/users/usersDetail";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";



// GET => GET userdetail

export const GET = async (request) => {
    try {

        const params = request.url.split('/');
        const userId = params[params.length - 1];

        if (!(userId?.length > 0)) {
            return new NextResponse(JSON.stringify({ error: "Invalid User ID provided" }), { status: 404 })
        }
        await dbConnect();
        const res = await UsersDetails.findOne({ 'user': userId }).populate({
            path: "user",
            select: "-password"
        });

        return NextResponse.json(res)
    } catch (error) {
        console.log("ERROR fetching user detail of specifit user \n" + error)
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

        // checking for usersession as returned from header cookies from client request
        const token = await getToken({ req: request })
        if (!token?.user.id) {
            return NextResponse.json({ message: "You must be logged in to perform edit." }, { status: 401 })
        }

        const dataToUpdate = await request.json();

        await dbConnect();
        const params = request.url.split('/');
        const userId = params[params.length - 1];
        const { bio, image, name, address, dob, username, phone } = dataToUpdate;




        if (token?.user.id != userId) {
            return NextResponse.json({ message: "You can update only your details." }, { status: 401 })
        }

        

        // username and phone validation for unique
        if (username) {
            const existingUsername = await Users.findOne({ username });
            if (existingUsername?._id) return new NextResponse(JSON.stringify({ field: "username", message: "Username already taken. Please choose another." }), { status: 403, statusText: "validation_error" })
        }


        if (phone) {
            const existingPhone = await Users.findOne({ phone });
            if (existingPhone?._id) return new NextResponse(JSON.stringify({ field: "phone", message: "Phone number is already registered." }), { status: 403, statusText: "validation_error" })
        }




        const newUserDetails = { bio, image, name, address, dob, };
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

        const wasArtist = userDetailsRes?.user?.isArtist;

        const isArtist = hasArtistDetails(userDetailsRes);
        if (isArtist != wasArtist) {
            const updatedUser = await Users.findByIdAndUpdate(userId, { isArtist }, { new: true });

            userDetailsRes.user = updatedUser;
        }


        return new NextResponse(JSON.stringify(userDetailsRes))
    } catch (error) {
        console.log("ERROR while patching userdetails \n" + error)
    }

}


// DELETE => DELETE a buyer detail

export const DELETE = async (request) => {

    try {
        // checking for usersession as returned from header cookies from client request
        const token = await getToken({ req: request })
        if (!token?.user.id) {
            return NextResponse.json({ message: "You must be logged in to delete." }, { status: 401 })
        }
        const userDetailData = await request.json();

        await dbConnect();
        const params = request.url.split('/');
        const userId = params[params.length - 1];

        if (token?.user.id !== userId) {
            return NextResponse.json({ message: "You can modify only your details." }, { status: 401 })
        }

        const res = await UsersDetails.deleteOne(
            { 'user': userId }
        )

        return new NextResponse(JSON.stringify(res))

    } catch (error) {
        console.log("ERROR while creating product \n" + error)
    }

}

//