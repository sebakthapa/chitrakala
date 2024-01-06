import dbConnect from "@/lib/dbConnect"
import { pageSize } from "@/lib/utils"
import Follows from "@/models/users/follows"
import Products from "@/models/users/products"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export const GET = async (req, response) => {

    try {
        const userId = req.url.split("/").at(-1).split("?")[0]
        const { searchParams } = new URL(req.url);
        
        const page = searchParams.get("page") || 1;

        if(!userId) return NextResponse.json({ error: true, errorMessage: "User Id is required!" }, { status: 400 })
        
        const token = await getToken({ req })
        console.log(token.user.id, userId)

        

        if (!token || token.user.id != userId) {
            return NextResponse.json({ error: true, errorMessage: "Unauthorized access!" }, { status: 401 })
        }
        const db = await dbConnect();

        const followingRes = await Follows.findOne({ user: userId })
        console.log("FOLLOWING RES", followingRes.following)

        if (followingRes == null) {
            return NextResponse.json([], { status: 200 })
        }
        const totalSize = await Products.countDocuments({
            artist: {
                $in: followingRes.following,
            }
        })
        const totalPages = Math.ceil(totalSize / pageSize);

        console.log("total size and total pages: ", totalSize, totalPages)

        const productRes = await Products.find({
            artist: {
                $in: followingRes.following,
            }
        })
            .sort({ createdAt: 1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .populate({
                path: 'artist',
                populate: {
                    path: 'user',
                    select:"-password"
                }
            })
        console.log("PRODUCT RES", productRes)
        console.log("----------------------------------------------------------------")

        return NextResponse.json(productRes)



    } catch (error) {
        console.log("ERROR OCCURED WHILE FETCHING FOLLOWING PRODUCTS", error)
        return NextResponse.error({ error: true })

    }
} 