import dbConnect from "../../../services/dbConnect.service";
import UserDetails from "@/models/users/usersDetail";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// GET => GET userdetail

export const GET = async () => {
  try {
    await dbConnect();

    const res = await UserDetails.find({}).populate("user");

    return new NextResponse(JSON.stringify(res));
  } catch (error) {
    console.log("ERROR fetching all  user detail \n" + error);
    return new NextResponse.json({ error: error });
  }
};

// POST => create a user details

export const POST = async (request) => {
  try {
    // checking for usersession as returned from header cookies from client request
    const token = await getToken({ req: request });
    if (!token?.user.id) {
      return NextResponse.json(
        { message: "You must be logged in to post." },
        { status: 401 },
      );
    }

    const {
      user,
      address = "",
      photo = "",
      displayName = "",
    } = await request.json();

    if (token?.user.id != user) {
      return NextResponse.json(
        { message: "You can add only your details." },
        { status: 401 },
      );
    }

    await dbConnect();

    const newUserDetail = new UserDetails({
      user,
      address,
      photo,
      displayName,
    });

    const savedUserDetail = await newUserDetail.save();

    return new NextResponse(JSON.stringify(savedUserDetail));
  } catch (error) {
    console.log("ERROR while creating product \n" + error);
  }
};

export const PATCH = async (request) => {
  try {
    // checking for usersession as returned from header cookies from client request
    const token = await getToken({ req: request });
    if (!token?.user.id) {
      return NextResponse.json(
        { message: "You must be logged in to edit your details." },
        { status: 401 },
      );
    }

    const {
      username,
      email,
      phone,
      address,
      displayName,
      bio,
      dob,
      photo,
      userId,
    } = await request.json();

    if (token?.user.id != userId) {
      return NextResponse.json(
        { message: "You can update only your details." },
        { status: 401 },
      );
    }

    await dbConnect();

    const res = await UserDetails.findOneAndUpdate(
      { user: userId },
      { address, displayName, photo, bio, dob },
      { new: true },
    );

    if (!res) {
      return new Response("User not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(res));
  } catch (error) {
    console.log("ERROR while creating product \n" + error);
  }
};
