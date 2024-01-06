import mongoose from "mongoose"

const verificationTokensSchema = new mongoose.Schema({

})

mongoose.models = {};

const VerificationTokens = mongoose.model("VerificationTokens", verificationTokensSchema);

export default VerificationTokens;