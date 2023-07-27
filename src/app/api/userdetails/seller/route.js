import dbConnect,{closeConnection} from "@/lib/dbConnect";
import SellerDetailsModel from "@/models/seller/usersDetail";
import { NextResponse } from "next/server";



// GET => GET userdetail

export const GET = async () => {

    try {
        await dbConnect("seller");

        const res = await SellerDetailsModel.find({}).populate('user');

        closeConnection("seller");
        return new NextResponse(JSON.stringify(res))
        
    } catch (error) {
        console.log("ERROR fetching buyer user detail \n" + error)
    }
}




// POST => POST a product

export const POST = async (request) => {

    try {
        const userDetailData = await request.json();
      
        await dbConnect("seller");

        const newUserDetail = new SellerDetailsModel(userDetailData);

        const savedUserDetail = await newUserDetail.save();
        closeConnection("seller");

        return new NextResponse(JSON.stringify(savedUserDetail))
        
    } catch (error) {
        console.log("ERROR while creating product \n" + error )
    }

}