import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Notifications from "@/models/users/notifications";
import dbConnect from "../../../../services/dbConnect.service";

//  delete request of notification
export const DELETE = async (req) => {
  try {
    await dbConnect();

    const { userId } = await req.json();

    // Validation checks
    if (!userId) {
      return NextResponse.json(
        { message: "Invalid request. userId  is required.", error: null },
        { status: 400 },
      );
    }

    const user = await Notifications.findOne({ userId });

    if (!user) {
      return NextResponse.json(
        { message: "User not found", error: null },
        { status: 404 },
      );
    }

    // Clear all the notification from the array
    user.notifications = [];

    // Save the updated user
    await user.save();

    return NextResponse.json(
      { message: "Notification cleared successfully", data: user },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting notification", error: error.message },
      { status: 500 },
    );
  }
};
