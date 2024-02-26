import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    unique: true,
    required: true,
    sparse:true
  },
  notifications: [
    {
      title: {
        type: String,
      },
      body: {
        type: String,
      },
      image: {
        type: String,
      },
      redirect: {
        type: String,
      },
      seen:{
        type : Boolean ,
        default: false
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });


notificationSchema.methods.deleteExpiredNotifications = async function (customCutoffTime = null) {
  const currentDate = new Date();
  const cutoffTime = customCutoffTime || 30 * 24 * 60 * 60 * 1000; // Default to 30 days if customCutoffTime is not provided
  const cutoffDate = new Date(currentDate - cutoffTime);
  // console.log(this);


  // Update the notifications array, keeping only the ones created within the specified time interval
  this.notifications = this.notifications.filter(
    (notification) => notification.createdAt >= cutoffDate || !notification.seen
  );

  // Save the updated document
  await this.save();
};




mongoose.models = {};

const Notifications = mongoose.model("Notifications", notificationSchema);

export default Notifications;
