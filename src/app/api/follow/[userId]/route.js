import dbConnect from "@/lib/dbConnect";
import Follows from "@/models/users/follows";
import UsersDetails from "@/models/users/usersDetail";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const toggleFollowing = (array,  element) => {
    if (array.includes(element)) {
        array = array.filter((elem) => elem != element)
    } else {
        array.push(element)
    }
    return array;
}

// 
export const PATCH = async (req, res) => {
    try {
        const {  userId, artistDetailsId } = await req.json();
        const userDetailsId = req.url.split("/").at(-1);

        if (!userDetailsId) return NextResponse.json({ error: true, errorMessage: "User Id is required" }, { status: 400 })
        const token = await getToken({ req })
        if (!token) return NextResponse.json({ error: true, errorMessage: "Unauthorized access!" }, { status: 401 })

        
        if (token?.user?.id != userId) {
            return NextResponse.json({ error: true, errorMessage: "You can only modify your followings" }, { status: 401 })
        }
        await dbConnect();

        let userRes = await Follows.findOne({ userDetails: userDetailsId }); // this is followng array of user. (lists to whom has user followed)
        let artistRes = await Follows.findOne({ userDetails: artistDetailsId }); // this is followers array (lists who has followed the artist) of artist who is being followed
        console.log("userres: ", userRes)
        if (userRes == null) {
            const userFollow = new Follows({ userDetails: userDetailsId, following: [artistDetailsId] })
            await userFollow.save();
        } else {
            let following = userRes.following
            following = toggleFollowing(following, artistDetailsId)
            await Follows.findOneAndUpdate({ userDetails: userDetailsId }, { following })
        }

        if (artistRes == null) {
            const artistFollow = new Follows({ userDetails: artistDetailsId, followers: [userDetailsId] })
            await artistFollow.save();
        } else {
            let followers = artistRes.followers
            followers = toggleFollowing(followers, userDetailsId)
            await Follows.findOneAndUpdate({ userDetails: artistDetailsId }, { followers })
        }

        return NextResponse.json({ error: false, }, { status: 200 })
    } catch (error) {
        console.log("Error while patching following", error)
        return NextResponse.error({ error })
    }
}

export const GET = async (req, response) => {
    const userDetailsId = req.url.split("/").at(-1);

    if (!userDetailsId) return NextResponse.json({ error: true, errorMessage: "User Id is required" }, { status: 400 })
   
    const res = await Follows.findOne({ userDetails: userDetailsId });


    return NextResponse.json(res?.following || [])
}