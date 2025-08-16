const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

// jab jab password change hoga tb automatic ye password hash kr dega
USER.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

//check password
USER.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", USER);
module.exports = User;
