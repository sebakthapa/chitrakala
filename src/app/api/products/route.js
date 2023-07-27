import dbConnect from "@/lib/dbConnect";
import Products from "@/models/seller/products";
import { NextResponse } from "next/server";





// GET => get all products
export const GET = async () => {
    try {
        await dbConnect("seller");

        const res = await Products.find({}).populate("seller");
        
        return new NextResponse(JSON.stringify(res))
        
    } catch (error) {
        console.log("ERROR fetching products \n" + error)
    }
}




// POST => POST a product

export const POST = async (request) => {

    try {
        const productsData = await request.json();
        // console.log(data);
        await dbConnect("seller");

        const newProduct = new Products(productsData);

        const savedProduct = await newProduct.save();

        return new NextResponse(JSON.stringify(savedProduct))
        
    } catch (error) {
        console.log("ERROR while creating product \n" + error )
    }

}