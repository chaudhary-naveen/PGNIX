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
<<<<<<< HEAD
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
=======
        type: Date,
    }
}, { timestamps: true });
>>>>>>> 69fe0fc19bb2913bc01bf6c5da41819b600f6685

const User = mongoose.model("User", USER);
module.exports = User;
