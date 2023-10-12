import dbConnect, { closeConnection } from "@/lib/dbConnect";
import Exhibition from "@/models/exhibition/exhibition";
import { NextResponse } from "next/server";





// GET => get all products
export const GET = async () => {
    try {
        await dbConnect("exhibition");

        const res = await Exhibition.find({});
        closeConnection("exhibition");
        return new NextResponse(JSON.stringify(res))

    } catch (error) {
        console.log("ERROR fetching Exhibitions  \n" + error)
    }
}




// POST => POST a product

export const POST = async (request) => {

    try {
        const { title, description = "",location, status="open", datetime, photo } = await request.json();
        console.log(datetime,photo);
        await dbConnect("exhibition");

        const newExhibiiton = new Exhibition({ title, location, description, status, photo,datetime });

        const savedExhibition = await newExhibiiton.save();
        closeConnection("exhibition");

        return new NextResponse(JSON.stringify(savedExhibition))

    } catch (error) {
        console.log("ERROR while creating product \n" + error)
    }

}