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

    // this is for is there is no new then make new notification
    let checker = await Notifications.findOne({userId})
    if(checker === null)
    {
      let newNotification = new Notifications({ userId, notifications });
      await newNotification.save();

    }else{

      
          var updatedNotification = await Notifications.findOneAndUpdate(
            { userId },
            { $push: { notifications } },
            { new: true, upsert: true }
          );
          // Perform additional operations if needed
          await updatedNotification.deleteExpiredNotifications();
    }

 

    return { message: "Notification added successfully", data: updatedNotification };
  } catch (error) {
    console.error(error);
    throw new Error("Error adding notification");
  }
};

export default sendNotification;
