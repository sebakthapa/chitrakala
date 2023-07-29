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



// PATCH => Update an existing user

export const PATCH = async (request) => {

    try {
      const { id, updateData, type } = await request.json();
  
      await dbConnect(type); 
  
      const UserModel = type === "buyer"? UserBuyer : UserSeller;
      
      const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
        new: true
      });
  
      closeConnection(type);
  
      return new NextResponse(JSON.stringify(updatedUser))
  
    } catch (error) {
      console.log("ERROR while updating user \n" + error);
    }
  }

  
// DELETE => Delete a user

export const DELETE = async (request) => {

    try {
      const { id, type } = await request.json();
  
      await dbConnect(type);
  
      const UserModel = type === "buyer"? UserBuyer : UserSeller;
  
      await UserModel.findByIdAndDelete(id);
  
      closeConnection(type);
  
      return new NextResponse(JSON.stringify({ message: "User deleted successfully" }));
  
    } catch (error) {
      console.log("ERROR while deleting user \n" + error);
    }
  }