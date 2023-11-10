import dbConnect from "@/lib/dbConnect";
import Exhibition from "@/models/exhibition/exhibition";
import { NextResponse } from "next/server";


// GET => get all exhibitions
export const GET = async () => {
    try {
        await dbConnect();

        const res = await Exhibition.find({});

        if (res) {
            return new NextResponse(JSON.stringify(res))
        }
        return new NextResponse(JSON.stringify({error: "No exibitions to load",}), {status: 400})

    } catch (error) {
        console.log("ERROR fetching Exhibitions  \n" + error)
    }
}




// POST => POST a product

export const POST = async (request) => {

    try {
        const { title, description = "",location, status="open", datetime, photo } = await request.json();
        console.log(datetime,photo);
        await dbConnect();

        const newExhibiiton = new Exhibition({ title, location, description, status, photo,datetime });

        const savedExhibition = await newExhibiiton.save();

        return new NextResponse(JSON.stringify(savedExhibition))

    } catch (error) {
        console.log("ERROR while creating product \n" + error)
    }

}