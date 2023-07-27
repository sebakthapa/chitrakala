import dbConnect,{closeConnection} from "@/lib/dbConnect";
import BuyerDetailsModel from "@/models/buyer/usersDetail";
import { NextResponse } from "next/server";



// GET => GET userdetail

export const GET = async () => {

    try {
        await dbConnect("buyer");

        const res = await BuyerDetailsModel.find({}).populate('user');

        closeConnection("buyer");
        return new NextResponse(JSON.stringify(res))
        
    } catch (error) {
        console.log("ERROR fetching buyer user detail \n" + error)
        return new NextResponse.json({error: error})
    }
}



// POST => POST a product

export const POST = async (request) => {

    try {
        const userDetailData = await request.json();
      
        await dbConnect("buyer");

        const newUserDetail = new BuyerDetailsModel(userDetailData);

        const savedUserDetail = await newUserDetail.save();

        closeConnection("buyer");
        return new NextResponse(JSON.stringify(savedUserDetail))
        
    } catch (error) {
        console.log("ERROR while creating product \n" + error )
    }

}



