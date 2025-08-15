const User = require('../Models/User');
const OTP = require('../Models/OTP');
const bcrypt = require('bcrypt');
const { generateOtp, sendByEmail } = require('./otp.controller');

const checkIfOwnerExist = async (req, res) => {
  const { email } = req.query;
  if (email === undefined || email === null || email === "") {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(404).json({ exists: true, message: "Owner already exists" });
    } else {
     
      const otp = await generateOtp();
      
      await OTP.deleteMany({ email });
      await OTP.create({ otp, email });
      await sendByEmail(email, otp);

      return res.status(200).json({ exists: false , message: "Owner found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const createUser = async (req, res) => {
  try {

    const {
      email,
      otp,
      password,
      firstname,
      gender,
      lastname,
      dob
    } = req.body;


    const otpresponse = await OTP.findOne({ email });

    if (!otpresponse) {
      return res.status(404).json({ success: false, msg: "OTP not found" });
    }

    if (otpresponse.otp == otp) {

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      let user = await User.create({
        email,
        password: hashPassword,
        firstname,
        lastname,
        dob,
        gender
      });

      user.password = "Hidden";

      res.send({
        success: true,
        msg: user
      });

      return res.status(200).json({ success: true, msg: "User created successfully", user });
    } else {
      return res.status(400).json({ success: false, msg: "Invalid OTP" });
    }


  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  checkIfOwnerExist,
  createUser
  // other exports can go here
};
