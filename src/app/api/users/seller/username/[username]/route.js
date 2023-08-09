import dbConnect,{closeConnection} from "@/lib/dbConnect";
import Users from "@/models/seller/users";
import { NextResponse } from "next/server";



// GET => GET userdetail

export const GET = async (request) => {

    try {
        await dbConnect("seller");
        const params = request.url.split('/');
        const username = params[params.length-1];
        const res = await Users.find({
            'username': username
        });


        closeConnection("seller");
        
        // handle if username is no till registered - that is username is available to register
        if (!res) return new NextResponse(JSON.stringify({message:"available"}))
       
        return new NextResponse(JSON.stringify({message: "unavailable"}))
        
    } catch (error) {
        console.log("ERROR validating username availability \n" + error)

    }
}
