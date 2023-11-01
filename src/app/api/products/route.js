import dbConnect from "@/lib/dbConnect";
import Products from "@/models/useraccounts/products";
import { NextResponse } from "next/server";





// GET => get all products
export const GET = async () => {
    try {
        await dbConnect();

        const res = await Products.find().populate("artist");
        return new NextResponse(JSON.stringify(res))

    } catch (error) {
        console.log("ERROR fetching products \n" + error)
    }
}




// POST => POST a product

export const POST = async (request) => {

    try {
        const { artist, name, price, description = "", category, photo, } = await request.json();
        // console.log(data);
        await dbConnect("user");

        const newProduct = new Products({ artist, name, price, description, category, photo, });

        const savedProduct = await newProduct.save();

        return new NextResponse(JSON.stringify(savedProduct))

    } catch (error) {
        console.log("ERROR while creating product \n" + error)
    }

}