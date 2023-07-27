import mongoose from "mongoose";
const userSchema = mongoose.Schema;
const usersDetailsSchema = new userSchema({

    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref : 'Users'
      },
    address: {
        type: String,
        maxlength: [256,"256 characters exteed for address."],
      },
    photo : {
        type: String
        
    }


})

const UsersDetails  = mongoose.models.UsersDetail || mongoose.model('UsersDetail',usersDetailsSchema)

export default UsersDetails;