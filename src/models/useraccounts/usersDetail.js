import mongoose from "mongoose";
const usersDetailsSchema = new mongoose.Schema({

  user: {
    required: [true, "userId is required"],
    unique: [true, "The userdetails already exists"],
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    autopopulate: {
      select: '-password' // remove listed fields from selection
    }
  },
  address: {
    type: new mongoose.Schema({
      country: String,
      state: String,
      city: String,
      street: String
    }),
    default: {}
  },

  image: {
    type: String,
  },
  name: {
    type: String,
    maxlength: [30, "Name should not exceed 30 characters"],
    minLength: [3, "Minimum 3 characters required"],
  },
  bio: {

    type: String,
    maxlength: [30, "Bio should not exceed 30 characters"],
    minLength: [3, "Minimum 3 characters required"],

  },
  dob: {
    type: String,
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: 'Date of birth must be in the past'
    }
  }


},
  { timestamps: true })

mongoose.models = {}

const UsersDetails = mongoose.model('UsersDetails', usersDetailsSchema)

export default UsersDetails;