import dbConnect from "@/lib/dbConnect";
import Products from "@/models/useraccounts/products";
import { NextRequest, NextResponse } from "next/server";

// GET a specific product by id
export const GET = async (req, res) => {
    try {
        const query = req.url.split("/");
        const productId = query[query.length - 1];

        await dbConnect();
        const product = await Products.findById(productId).populate("artist")
        return new NextResponse(JSON.stringify(product))
    } catch (error) {
        console.log("ERROR while getting single product" + error)
        return new NextResponse(JSON.stringify({ error: "error occured" }))
    }
    

}



// PUT a specific product by id
export const PUT = async () => {
    try {
        const { seller, name, price, description = "", category, photo} = await req.json();
        const query = req.url.split("/");
        const productId = query[query.length - 1];

        const updatedData = { seller, name, price, description, category, photo, like };

        await dbConnect();
        const newProduct = await Products.findByIdAndUpdate(productId, updatedData).populate("seller")
    
        return new NextResponse(JSON.stringify(newProduct))
    } catch (error) {
        console.log("ERROR while getting single product" + error)
        return new NextResponse(JSON.stringify({ error: "error occured" }))
    }

}



// DELETE a specific product by id
export const DELETE = async () => {
    try {
        const query = req.url.split("/");
        const productId = query[query.length - 1];

        await dbConnect();
        const product = await Products.findByIdAndDelete(productId)

        return new NextResponse(JSON.stringify(product))


    } catch (error) {
        console.log("ERROR while getting single product" + error)
        return new NextResponse(JSON.stringify({ error: "error occured" }))
    }


}