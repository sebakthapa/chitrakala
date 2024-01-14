import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Notifications from "@/models/users/notifications";
import dbConnect from "@/lib/dbConnect";





export const GET = async (req) => {
  try {
    await dbConnect();
    const query = req.url.split("?")[1];
    const searchParams = new URLSearchParams(query);
    const queryObj = {};
    for (const [key, value] of searchParams.entries()) {
      queryObj[key] = value;
    }
    
    const userId = queryObj.userId;
    const user = await Notifications.findOne({  userId });
    
    return NextResponse.json({ message: "Notifications fetched successfully", data: user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching notifications", error: error.message }, { status: 500 });
  }
};



export const POST = async (req) => {
  try {
    await dbConnect();
    
    const { userDetails, notifications } = await req.json();

    // Validation checks
    if (!userDetails || !notifications) {
      return NextResponse.json({ message: "Invalid request. userDetails and notifications are required.", error: null }, { status: 400 });
    }

    let updatedUser = await Notifications.findOneAndUpdate(
      { userDetails },
      { $push: { notifications } },
      { new: true }
    );

    if (!updatedUser) {
      updatedUser = await Notifications.create({ userDetails, notifications });
    }
    
    if (updatedUser) {
      await updatedUser.deleteExpiredNotifications();
    }

    return NextResponse.json({ message: "Notification added successfully", data: updatedUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error adding notification", error: error.message }, { status: 500 });
  }
};
