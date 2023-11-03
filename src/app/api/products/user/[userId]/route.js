import dbConnect from "@/lib/dbConnect";
import Products from "@/models/useraccounts/products";
import { NextRequest, NextResponse } from "next/server";

// GET a specific product by id
export const GET = async (req,res) => {
    try {
        const query = req.url.split("/");
        const userId = query[query.length - 1];
        await dbConnect();

        const res = await Products.find({})
        .populate({
            path: 'artist',
            match: { 'user': userId } 
          });

        return new NextResponse(JSON.stringify(res))

    } catch (error) {
        console.log("ERROR fetching products \n" + error)
    }
}



