import mongoose from "mongoose";
const userSchema = mongoose.Schema;

const usersSchema = new userSchema({

    username: {
        type: String,
        required: [true, "Username field is required"],
        unique: [true,"Username already exists"],
        minlength: [3,"Minimum 3 characters required for username."],
      },
    type: {
        type: String,
        required: [true, "Account type field is required"],
      },

    phone: {
        type: String,
        
        unique: [true,"Phone number already registered."],
        minlength: [10,"Minimum 3 characters required for username."],
        maxlength: [10,"Minimum 3 characters required for username."],
      },
    email: {
        type: String,
        required: [true, "Email field is required"],
        unique: [true,"Email already exists"]
      },
    password: {
        type: String,
        required: [true, "Password field is required"],
        minlength: [6,"Minimum 6 characters required for password."],
        maxlength: [256,"Password cannot exceed 256 characters."],

      }
})

const Users  = mongoose.models.Users || mongoose.model('Users',usersSchema);

export default Users;