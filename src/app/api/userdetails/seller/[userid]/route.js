import dbConnect,{closeConnection} from "@/lib/dbConnect";
import SellerDetails from "@/models/seller/usersDetail";
import { NextResponse } from "next/server";



// GET => GET userdetail

export const GET = async (request) => {

    try {
        await dbConnect("seller");
        const params = request.url.split('/');
        const userId = params[params.length-1];
        const res = await SellerDetails.find({
            'user': userId
        }).populate('user');

        closeConnection("seller");
        return new NextResponse(JSON.stringify(res))
        
    } catch (error) {
        console.log("ERROR fetching user detail \n" + error)
    }
}

// UPDATE => UPDATE a seller detail

export const PATCH = async (request) => {

    try {
        const userDetailData = await request.json();
      
        await dbConnect("seller");
        const params = request.url.split('/');
        const userId = params[params.length-1];
        
        const res = await SellerDetails.findOneAndUpdate(
            {'user': userId},
            userDetailData,
            {new: true}
        )

        closeConnection("seller");
        return new NextResponse(JSON.stringify(res))
        
    } catch (error) {
        console.log("ERROR while creating product \n" + error )
    }

}


// DELETE => DELETE a seller detail

export const DELETE = async (request) => {

    try {
        const userDetailData = await request.json();
      
        await dbConnect("seller");
        const params = request.url.split('/');
        const userId = params[params.length-1];
        
        const res = await SellerDetails.deleteOne(
            {'user': userId}
        )

        closeConnection("seller");
        return new NextResponse(JSON.stringify(res))
        
    } catch (error) {
        console.log("ERROR while creating product \n" + error )
    }

}
