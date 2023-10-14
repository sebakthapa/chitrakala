import dbConnect, { closeConnection } from "@/lib/dbConnect";
import Products from "@/models/useraccounts/products";
import { NextResponse } from "next/server";





// GET => get all products
export const GET = async () => {
    try {
        await dbConnect("useraccounts");

        const res = await Products.find({}).populate("seller");
        closeConnection("useraccounts");
        return new NextResponse(JSON.stringify(res))

    } catch (error) {
        console.log("ERROR fetching products \n" + error)
    }
}




// POST => POST a product

export const POST = async (request) => {

    try {
        const { seller, name, price, description = "", category, photo, } = await request.json();
        // console.log(data);
        await dbConnect("user");

        const newProduct = new Products({ seller, name, price, description, category, photo, });

        const savedProduct = await newProduct.save();

        return new NextResponse(JSON.stringify(savedProduct))

    } catch (error) {
        console.log("ERROR while creating product \n" + error)
    }

}