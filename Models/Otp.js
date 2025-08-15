const mongoose = require("mongoose");
const { Schema } = mongoose;

const OTPSchema = new Schema(
  {
    otp: Number,
    email: String,
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300 
    }
  },
  { timestamps: true }
);

const OTP = mongoose.model("OTP", OTPSchema);
module.exports = OTP;
