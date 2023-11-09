import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username field is required"],
      unique: [true, "Username already exists"],
      minlength: [3, "Minimum 3 characters required for username."],
      sparse: true,
    },

    phone: {
      type: String,
      unique: [true, "Phone is number already registered."],
      sparse: true,
    },
    email: {
      type: String,
      required: [true, "Email field is required"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Password field is required"],
      minlength: [6, "Minimum 6 characters required for password."],
      maxlength: [256, "Password cannot exceed 256 characters."],

    },
    isArtist: {
      type: Boolean,
      default: false,
    },
    emailVerified: {
      type: Date,
      default:null,
      // default: false,
    },
  },
  {
    timestamps: true,
  },
);
mongoose.models = {};

const Users = mongoose.model("Users", userSchema);

export default Users;
