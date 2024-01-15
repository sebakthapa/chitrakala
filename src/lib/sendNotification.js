import axios from "axios";
import Notifications from "@/models/users/notifications";
import dbConnect from "./dbConnect";

const sendNotification = async (userId, notifications) => {
  try {
    await dbConnect();

    // Validation checks
    if (!userId || !notifications) {
      throw new Error("Invalid request. userId and notifications are required.");
    }

    // Use findOneAndUpdate with upsert: true
    let updatedNotification = await Notifications.findOneAndUpdate(
      { userId },
      { $push: { notifications } },
      { new: true, upsert: true }
    );

    return { message: "Notification added successfully", data: updatedNotification };
  } catch (error) {
    console.error(error);
    throw new Error("Error adding notification");
  }
};

export default sendNotification;
