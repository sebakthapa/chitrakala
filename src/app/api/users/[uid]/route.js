import dbConnect from "@/lib/dbConnect";
import Users from "@/models/useraccounts/users";
import { NextResponse } from "next/server";


// get username from db (GET USER NOT APPLICABLE as userdetails is used to load user)

export const GET = async (request) => {
  try {
    const params = request.url.split('/');
    const id = params[params.length - 1];
    console.log(id)
    await dbConnect();
    const res = await Users.findById(id);

    console.log("res from user fetch", res)

    // handle if username is no till registered - that is username is available to register
    if (!res) return new NextResponse(JSON.stringify({ error: "user doesn't exist" }), { status: 404 })

    return new NextResponse(JSON.stringify(res))



  } catch (error) {
    console.log("ERROR loading Usesr \n")
    throw error;
  }
}


export const PATCH = async (request) => {

  try {
    const params = request.url.split('/');
    const id = params[params.length - 1];
    console.log(id)

    const updatedData = await request.json();

    await dbConnect();

    if (updatedData.username) {
      const username = updatedData.username;
      const existingUsername = await Users.findOne({ username });
      if (existingUsername?._id) return new NextResponse(JSON.stringify({ field: "username", message: "Username already taken." }), { status: 403, statusText: "validation_error" })
    }

    if (updatedData.phone) {
      const phone = updatedData.phone;

      const existingPhone = await Users.findOne({ phone });
      if (existingPhone?._id) return new NextResponse(JSON.stringify({ field: "phone", message: "This phone is linked with another user." }), { status: 403, statusText: "validation_error" })
    }

    if (updatedData.email) {
      const email = updatedData.email;

      const existingEmail = await Users.findOne({ email });
      if (existingEmail?._id) {
        return new NextResponse(JSON.stringify({ field: "email", message: "This email is linked with another user." }), { status: 403, statusText: "validation_error" })
      }
    }

    const { phone, username } = updatedData;

    const updatedUser = await Users.findByIdAndUpdate(id, { phone, username }, {
      new: true
    });


    return new NextResponse(JSON.stringify(updatedUser))

  } catch (error) {
    console.log("ERROR while updating user \n" + error);
  }
}