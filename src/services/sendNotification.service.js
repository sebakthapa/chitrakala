import axios from "axios";
import Notifications from "@/models/users/notifications";
import dbConnect from "./dbConnect.service";

const sendNotification = async (userId, notification) => {
  try {
    await dbConnect();

    // Validation checks
    if (!userId || !notification) {
      throw new Error("Invalid request. userId and notification are required.");
    }

    const result = await Notifications.findOneAndUpdate(
      { userId },
      {
        $push: { notifications: notification },
      },
    );

    if (result === null) {
      const newData = await Notifications.create({
        userId,
        notifications: [notification],
      });
      return { message: newData };
    }
    return { message: result };
  } catch (error) {
    throw new Error("Error adding/updating notification");
  }
};

export default sendNotification;
