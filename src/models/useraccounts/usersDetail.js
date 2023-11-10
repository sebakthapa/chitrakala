import mongoose from "mongoose";
const usersDetailsSchema = new mongoose.Schema({

  user: {
    required: [true, "userId is required"],
    unique: [true, "The userdetails already exists"],
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    // autopopulate: {
    //   select: '-password' // remove listed fields from selection
    // }
  },
  address: {
    type: String,
    default: "",
  },

  image: {
    type: String,
  },
  name: {
    type: String,
    maxlength: [150, "Name should not exceed 150 characters"],
    minLength: [3, "Minimum 3 characters required"],
  },
  bio: {

    type: String,
    maxlength: [30, "Bio should not exceed 30 characters"],
    minLength: [3, "Minimum 3 characters required"],

  },
  dob: {
    type: Date,
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: 'Date of birth must be in the past'
    }
  },
  artWorks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Products',
    default: []


},
  likeProducts : 
  {
    ref: 'Products',
    type:[mongoose.Schema.Types.ObjectId],
    default: []
  }
  


},
  { timestamps: true })

mongoose.models = {}

const UsersDetails = mongoose.model('UsersDetails', usersDetailsSchema)

export default UsersDetails;