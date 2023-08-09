import dbConnect , { closeConnection } from "@/lib/dbConnect";
import Users from "@/models/buyer/users";
import UsersDetails from "@/models/buyer/usersDetail";
import { NextResponse } from "next/server";




// POST => POST a user

export const POST = async (request) => {

    try {
        const {username, email, password, phone, displayName } = await request.json();
        await dbConnect("buyer");

      const newUser = new Users({ username, email, password });
      phone && (newUser.phone = phone);
      const savedUser = await newUser.save();
      

      if (savedUser?._id) {
        const newUserDetail = new UsersDetails({ user: newUser._id });
        phone && (newUserDetail.phone = phone);
        displayName && (newUserDetail.displayName = displayName);

        const savedUserDetail = await newUserDetail.save();
        console.log(savedUserDetail);

        const data = await savedUserDetail.populate('user');
        closeConnection("buyer");
        
        return new NextResponse(JSON.stringify(data))
      }
      

        
        
    } catch (error) {
        console.log("ERROR while creating user \n" + error )
    }

}



// PATCH => Update an existing user

export const PATCH = async (request) => {

    try {
      const { id, updatedData } = await request.json();
  
      await dbConnect("buyer"); 
  
      
      const updatedUser = await Users.findByIdAndUpdate(id, updatedData, {
        new: true
      });
  
      closeConnection("buyer");
  
      return new NextResponse(JSON.stringify(updatedUser))
  
    } catch (error) {
      console.log("ERROR while updating user \n" + error);
    }
  }

  
// DELETE => Delete a user

export const DELETE = async (request) => {

    try {
      const { id } = await request.json();
  
      await dbConnect("buyer");
  
  
      await Users.findByIdAndDelete(id);
  
      closeConnection("buyer");
  
      return new NextResponse(JSON.stringify({ message: "User deleted successfully" }));
  
    } catch (error) {
      console.log("ERROR while deleting user \n" + error);
    }
  }