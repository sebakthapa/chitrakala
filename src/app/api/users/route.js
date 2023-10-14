import dbConnect, { closeConnection } from "@/lib/dbConnect";
import Users from "@/models/useraccounts/users";
import UsersDetails from "@/models/useraccounts/usersDetail";
import { NextResponse } from "next/server";




// POST => POST a user

export const POST = async (request) => {

  try {
    const { username, email, password, phone, displayName } = await request.json();
    await dbConnect("useraccounts");


    // validation part
    const existingEmail = await Users.findOne({ email });
    if (existingEmail?._id) return new NextResponse(JSON.stringify({ field: "email", message: "Email is already registered." }), { status: 403, statusText:"validation_error" })

    const existingUsername = await Users.findOne({ username });
    if (existingUsername?._id) return new NextResponse(JSON.stringify({ field: "username", message: "Username already taken. Please choose another." }), { status: 403, statusText:"validation_error" })

    if (phone) {
      const existingPhone = await Users.findOne({ phone });
      if (existingPhone?._id) return new NextResponse(JSON.stringify({ field: "phone", message: "Phone number is already registered." }), { status: 403, statusText:"validation_error" })
    }


    // saving new user
    const newUser = new Users({ username, email, password });
    phone && (newUser.phone = phone);
    const savedUser = await newUser.save();


    //saving userdetails of new user if the new user is created
    if (savedUser?._id) {
      const newUserDetail = new UsersDetails({ user: newUser._id });
      phone && (newUserDetail.phone = phone);
      displayName && (newUserDetail.displayName = displayName);

      const savedUserDetail = await newUserDetail.save();

      const data = await savedUserDetail.populate('user', { username: 1, email: 1, _id: 1, phone: 1, });


      closeConnection("useraccounts");

      return new NextResponse(JSON.stringify(data))
    }


  } catch (error) {
    closeConnection("useraccounts");
    console.log("ERROR while creating user \n" + error)
  } finally {
    closeConnection("useraccounts");
    
  }

}



// PATCH => Update an existing user

export const PATCH = async (request) => {

  try {
    const { id, updatedData } = await request.json();

    await dbConnect("useraccounts");


    const updatedUser = await Users.findByIdAndUpdate(id, updatedData, {
      new: true
    });

    closeConnection("useraccounts");

    return new NextResponse(JSON.stringify(updatedUser))

  } catch (error) {
    console.log("ERROR while updating user \n" + error);
  }
}


// DELETE => Delete a user

export const DELETE = async (request) => {

  try {
    const { id } = await request.json();

    await dbConnect("useraccounts");


    await Users.findByIdAndDelete(id);

    closeConnection("useraccounts");

    return new NextResponse(JSON.stringify({ message: "User deleted successfully" }));

  } catch (error) {
    console.log("ERROR while deleting user \n" + error);
  }
}