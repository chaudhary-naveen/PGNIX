const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const USER = new Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },

    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "owner"], //koi other choice nhi cahiye
      default: "user",
    },
    dob: {
      type: Date,
    },
    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", USER);
module.exports = User;
