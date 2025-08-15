const mongoose = require("mongoose");

const propertySchema = mongoose.Schema(
  {
    propertyName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    rent: {
      type: Number,
      required: true,
    },
    co_ed: {
      type: Boolean,
      required: true,
    },
    totalRooms: {
      type: Number,
      default: 0,
    },
    Ac_rooms: {
      type: Number,
      deafult: 0,
      //check krega ki ac_rooms less or equal ho total_room se
      validate: {
        validator: function (value) {
          return value <= this.totalRooms;
        },
        message: "AC rooms must be less than or equal to total rooms",
      },
    },

    isFurnished: {
      type: Boolean,
      default: false,
    },
    security_money: {
      type: Number,
      validate: {
        validator: function (value) {
          return value <= this.rent;
        },
        message: "security money can not exceed than rent",
      },
    },
    description: {
      type: String,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
