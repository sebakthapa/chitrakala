import dbConnect from "@/lib/dbConnect";
import Follows from "@/models/users/follows";
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
        const { artistId } = await req.json();
        const userId = req.url.split("/").at(-1);

        if (!userId) return NextResponse.json({ error: true, errorMessage: "User Id is required" }, { status: 400 })
        const token = await getToken({ req })
        if (!token) return NextResponse.json({ error: true, errorMessage: "Unauthorized access!" }, { status: 401 })

        if (token?.user?.id !== userId) {
            return NextResponse.json({ error: true, errorMessage: "You can only modify your followings" }, { status: 401 })
        }
        await dbConnect();

        let userRes = await Follows.findOne({ user: userId }); // this is followng array of user. (lists to whom has user followed)
        let artistRes = await Follows.findOne({ user: artistId }); // this is followers array (lists who has followed the artist) of artist who is being followed

        if (userRes == null) {
            const userFollow = new Follows({ user: userId, following: [artistId] })
            await userFollow.save();
        } else {
            let following = userRes.following
            following = toggleFollowing(following, artistId)
            await Follows.findOneAndUpdate({ user: userId }, { following })
        }

        if (artistRes == null) {
            const artistFollow = new Follows({ user: artistId, followers: [userId] })
            await artistFollow.save();
        } else {
            let followers = artistRes.followers
            followers = toggleFollowing(followers, userId)
            await Follows.findOneAndUpdate({ user: artistId }, { followers })
        }

        return NextResponse.json({ error: false, }, { status: 200 })
    } catch (error) {
        console.log("Error while patching following", error)
        return NextResponse.error({ error })
    }
}

export const GET = async (req, response) => {
    const userId = req.url.split("/").at(-1);
    console.log(userId)

    if (!userId) return NextResponse.json({ error: true, errorMessage: "User Id is required" }, { status: 400 })
   
    const res = await Follows.findOne({ user: userId });
    
    

    return NextResponse.json(res.following)
}