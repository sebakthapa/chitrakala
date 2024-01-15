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



export const PATCH = async (req) => {
  try {
    await dbConnect();
    
    const { userId, notifications } = await req.json();

    // Validation checks
    if (!userId || !notifications) {
      return NextResponse.json({ message: "Invalid request. userId and notifications are required.", error: null }, { status: 400 });
    }

    let updatedNotification = await Notifications.findOneAndUpdate(
      { userId },
      { $push: { notifications } },
      { new: true }
    );

    if (!updatedNotification) {
      const newNotification = new  Notifications({ userId, notifications });
      newNotification.save()
    }
    
    if (updatedNotification) {
      await updatedNotification.deleteExpiredNotifications();
    }

    return NextResponse.json({ message: "Notification added successfully", data: updatedNotification }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error adding notification", error: error.message }, { status: 500 });
  }
};
