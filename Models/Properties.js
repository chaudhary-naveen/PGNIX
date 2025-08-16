const mongoose = require("mongoose");

const propertySchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
      enum: ["Active", "Inactive"], // frontend ke according "Active"/"Inactive"
      default: "Inactive",
    },
    rent: {
      type: Number,
      required: true,
    },
    isCoed: {
      type: Boolean,
      required: true,
    },
    totalRooms: {
      type: Number,
      default: 0,
    },
    acRooms: {
      type: Number,
      default: 0,
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
    city: {
      type: String,
    },
    securityMoney: {
      type: Number,
      validate: {
        validator: function (value) {
          return value <= this.rent;
        },
        message: "Security money cannot exceed rent",
      },
    },
    description: {
      type: String,
    },

    //yha images ko add kr diya hi
    images: {
      type: [String], // image URLs from multer/cloudinary
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);

// const mongoose = require("mongoose");

// const propertySchema = mongoose.Schema(
//   {
//     owner: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     propertyName: {
//       type: String,
//       required: true,
//     },
//     location: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["active", "inactive"],
//       default: "inactive",
//     },
//     rent: {
//       type: Number,
//       required: true,
//     },
//     co_ed: {
//       type: Boolean,
//       required: true,
//     },
//     totalRooms: {
//       type: Number,
//       default: 0,
//     },
//     Ac_rooms: {
//       type: Number,
//       default: 0,
//       validate: {
//         validator: function (value) {
//           return value <= this.totalRooms;
//         },
//         message: "AC rooms must be less than or equal to total rooms",
//       },
//     },
//     isFurnished: {
//       type: Boolean,
//       default: false,
//     },
//     city: {
//       type: String,
//     },
//     security_money: {
//       type: Number,
//       validate: {
//         validator: function (value) {
//           return value <= this.rent;
//         },
//         message: "security money can not exceed than rent",
//       },
//     },
//     description: {
//       type: String,
//     },
//     typesOfRoom: {
//       type: String,
//       enum: ["single", "double", "triple"],
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Property", propertySchema);
