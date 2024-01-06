import mongoose from "mongoose";

const FollowsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        unique: true,
        required: [true, "User reference Id is required"]
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
})

mongoose.models = {}

const Follows = mongoose.model('Follows', FollowsSchema)

export default Follows;