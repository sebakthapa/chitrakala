import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userDetails: {
        type: mongoose.Schema.ObjectId,
        ref: "UsersDetails",
        sparse: true,
        required: [true, "User details reference Id is required"]
    },
  items: [
    {
      art_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
      },
      status: {
        type: String,
        enum: ['pending', 'success'],
        required: true
      }
    }
  ]
},{ timestamps: true });

mongoose.models = {};

const Order = mongoose.model("Order", orderSchema);

export default Order;