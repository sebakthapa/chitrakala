import dbConnect from "@/lib/dbConnect";
import Follows from "@/models/users/follows";
import UsersDetails from "@/models/users/usersDetail";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import sendNotification from "@/lib/sendNotification";


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

        let userRes = await Follows.findOne({ userDetails: userDetailsId }).populate("userDetails"); // this is followng array of user. (lists to whom has user followed)
        let artistRes = await Follows.findOne({ userDetails: artistDetailsId }).populate("userDetails"); // this is followers array (lists who has followed the artist) of artist who is being followed
        let isFollow;
        if (userRes == null) {
            const userFollow = new Follows({ userDetails: userDetailsId, following: [artistDetailsId] })
            await userFollow.save();
            isFollow = true;
        } else {
            let following = userRes.following
            
            following = toggleFollowing(following, artistDetailsId)
            await Follows.findOneAndUpdate({ userDetails: userDetailsId }, { following })
            isFollow = following.includes(artistDetailsId)
        }
        if (artistRes == null) {
            const artistFollow = new Follows({ userDetails: artistDetailsId, followers: [userDetailsId] })
            await artistFollow.save();
        } else {
            let followers = artistRes.followers
            followers = toggleFollowing(followers, userDetailsId)

            await Follows.findOneAndUpdate({ userDetails: artistDetailsId }, { followers })
        }

        const userDetails = await UsersDetails.findById(userDetailsId)
        const artistDetails = await UsersDetails.findById(artistDetailsId)
        const notificationMessage = isFollow
        ? `${userDetails?.name} started following you`
        : `${userDetails?.name} unfollowed you`;

        const updatedNotification = {
            title: isFollow ? "You got a new follower" : "Someone unfollowed you",
            body: notificationMessage,
            image: userDetails?.image,
            redirect:  `/artist/${artistDetailsId}` ,
        };
       
            try {
              
              const res = await sendNotification(artistDetails?.user, updatedNotification)
               // Handle the result if needed
              console.log(res.message);
              console.log(res.data);
            } catch (error) {
              console.error(error.message);
            }
      




        return NextResponse.json({ error: false, }, { status: 200 })
    } catch (error) {
        console.log("Error while patching following", error)
        return NextResponse.error({ error })
    }
}

export const GET = async (req, response) => {
    const userId = req.url.split("/").at(-1); //this is user ID

    if (!userId) return NextResponse.json({ error: true, errorMessage: "User Id is required" }, { status: 400 })
    const userDetails = await UsersDetails.findOne({ user: userId })
   
    const res = await Follows.findOne({ userDetails: userDetails?._id });


    return NextResponse.json(res?.following || [])
}