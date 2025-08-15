const { Schema } = require("mongoose");
const mongoose = require('mongoose');

const USER = new Schema({
    name: {
        type: String,
        required: true,
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
        required: true,
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
    },
    dob: {
        type: Date,
    },

}, { timestamps: true });

const User = mongoose.model("User", USER);
module.exports = User;
