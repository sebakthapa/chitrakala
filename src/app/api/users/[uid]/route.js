import dbConnect from "@/lib/dbConnect";
import Users from "@/models/useraccounts/users";
import { NextResponse } from "next/server";


// get username from db (GET USER NOT APPLICABLE as userdetails is used to load user)

export const GET = async (request) => {

    try {
        await dbConnect();
        const params = request.url.split('/');
        const id = params[params.length - 1];
        console.log(id)
        const res = await Users.findById(id);
        
        console.log(res)
    
        // handle if username is no till registered - that is username is available to register
        if (!res) return new NextResponse(JSON.stringify({error:"user doesn't exist"}), {status: 404})
       
        return new NextResponse(JSON.stringify(res))


        
    } catch (error) {
        console.log("ERROR loading Usesr \n" )
        throw error;
    }
}


export const PATCH = async (request) => {

    try {
      const { updatedData, } = await request.json();
  
      await dbConnect();
  
  
      const updatedUser = await Users.findByIdAndUpdate(id, { ...updatedData, }, {
        new: true
      });
  
  
      return new NextResponse(JSON.stringify(updatedUser))
  
    } catch (error) {
      console.log("ERROR while updating user \n" + error);
    }
  }