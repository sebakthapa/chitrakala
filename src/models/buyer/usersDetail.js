import mongoose from "mongoose";
const usersDetailsSchema = new mongoose.Schema({

  user: {
    required:[true, "userId is required"],
    unique:[true, "The userdetails already exists"],
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  address: {
    type: String,
    maxlength: [256, "256 characters exteed for address."],
  },
  photo: {
    type: String,

  },
  displayName: {
    type: String,
    maxlength: [30, "Name should not exceed 30 characters"],
    minLength: [3, "Minimum 3 characters required"],
  }


})

const UsersDetails = mongoose.models.UsersDetail || mongoose.model('UsersDetail', usersDetailsSchema)

export default UsersDetails;