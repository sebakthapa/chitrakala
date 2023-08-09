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
    type: String

  }

})

const UsersDetails = mongoose.models.UsersDetail || mongoose.model('UsersDetail', usersDetailsSchema)

export default UsersDetails;