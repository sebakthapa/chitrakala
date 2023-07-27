import dbConnect , { closeConnection } from "@/lib/dbConnect";
import UserBuyer from "@/models/buyer/users";
import UserSeller from "@/models/seller/users";
import { NextResponse } from "next/server";


// POST => POST a user

export const POST = async (request) => {

    try {
        const userData = await request.json();
        const {type} = userData;
        console.log(type)
        await dbConnect(type);

        const UserModel = type === "buyer"? UserBuyer : UserSeller;
        const newUser = new UserModel(userData);

        const savedUser = await newUser.save();
        closeConnection(type);
        
        return new NextResponse(JSON.stringify(savedUser))
        
    } catch (error) {
        console.log("ERROR while creating user \n" + error )
    }

}