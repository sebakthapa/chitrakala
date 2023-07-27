import dbConnect,{closeConnection} from "@/lib/dbConnect";
import Products from "@/models/seller/products";
import { NextRequest, NextResponse } from "next/server";

// GET a specific product by id
export const GET = async (req, res) => {
    try {
        const query = req.url.split("/");
        const productId = query[query.length - 1];

        await dbConnect("seller");
        const product = await Products.findById(productId).populate("seller")
        closeConnection("seller")
        return new NextResponse(JSON.stringify(product))
    } catch (error) {
        console.log("ERROR while getting single product" + error)
        return new NextResponse(JSON.stringify({ error: "error occured" }))
    }

}



// PUT a specific product by id
export const PUT = async () => {
    try {
        const productData = await req.json();
        const query = req.url.split("/");
        const productId = query[query.length - 1];

        await dbConnect("seller");
        const newProduct = await Products.findByIdAndUpdate(productId, productData).populate("seller")
        closeConnection("seller")
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

        await dbConnect("seller");
        const product = await Products.findByIdAndDelete(productId)

        return new NextResponse(JSON.stringify(product))


    } catch (error) {
        console.log("ERROR while getting single product" + error)
        return new NextResponse(JSON.stringify({ error: "error occured" }))
    }


}