import mongoose from "mongoose";

const wishListsSchema = new mongoose.Schema({
    userDetails: {
        type: mongoose.Schema.ObjectId,
        ref: "UsersDetails",
        unique: true,
        required: [true, "User details reference Id is required"]
    },
  wishlists: {
    ref: 'Products',
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  }
 
},{ timestamps: true });

mongoose.models = {}
const Wishlists = mongoose.model('Wishlists', wishListsSchema);

module.exports = Wishlists;
