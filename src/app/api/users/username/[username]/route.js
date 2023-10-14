import dbConnect,{closeConnection} from "@/lib/dbConnect";
import Users from "@/models/useraccounts/users";
import { NextResponse } from "next/server";


// get username from db

export const GET = async (request) => {

    try {
        await dbConnect("useraccounts");
        const params = request.url.split('/');
        const username = params[params.length-1];
        const res = await Users.findOne({
            'username': username
        });
        
        closeConnection("useraccounts");
        console.log(res)
    

        // handle if username is no till registered - that is username is available to register
        if (!res) return new NextResponse(JSON.stringify({message:"available"}))
       
        return new NextResponse(JSON.stringify({message: "unavailable"}))


        
    } catch (error) {
        console.log("ERROR validating username availability \n" + error)
        return new NextResponse(error);
    }
}

