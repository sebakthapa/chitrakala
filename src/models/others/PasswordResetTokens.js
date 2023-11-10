const { default: mongoose } = require("mongoose");

// models/token.model.js
const tokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        ref: "user",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,// this is the expiry time in seconds
    },
}, {
    expires: "1h"
});


mongoose.models = {};

const PasswordResetTokens = mongoose.model("PasswordResetTokens", tokenSchema);

export default PasswordResetTokens;