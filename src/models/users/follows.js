import mongoose from "mongoose";

const FollowsSchema = new mongoose.Schema({
    userDetails: {
        type: mongoose.Schema.ObjectId,
        ref: "UsersDetails",
        unique: true,
        required: [true, "User details reference Id is required"]
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
},
{ timestamps: true })

mongoose.models = {}

const Follows = mongoose.model('Follows', FollowsSchema)

export default Follows;