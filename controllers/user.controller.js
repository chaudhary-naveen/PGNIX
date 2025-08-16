const User = require("../Models/User");
const OTP = require("../Models/OTP");
const bcrypt = require("bcrypt");
const { generateOtp, sendByEmail } = require("./otp.controller");

const checkIfOwnerExist = async (req, res) => {
  const { email } = req.query;
  if (email === undefined || email === null || email === "") {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      return res
        .status(404)
        .json({ exists: true, message: "Owner already exists" });
    } else {
      const otp = await generateOtp();

      await OTP.deleteMany({ email });
      await OTP.create({ otp, email });
      await sendByEmail(email, otp);
      console.log("OTP sent to email:", email + " with OTP: " + otp);
      return res.status(200).json({ exists: false, message: "Owner found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const createUser = async (req, res) => {
  try {
    const { email, otp, password, firstname, gender, lastname, dob, phone } =
      req.body;

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
        gender,
        phone,
      });

      user = user.toObject();
      delete user.password;
      return res
        .status(200)
        .json({ success: true, msg: "User created successfully", user });
    } else {
      return res.status(400).json({ success: false, msg: "Invalid OTP" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are Required",
      });
    }

    //check user exist then fecth
    const preUser = await User.findOne({ email });
    if (!preUser) {
      return res.status(400).json({
        message: "user Not Found , create new Account",
        status: false,
      });
    }
    // check password

    const isPasswordCorrect = await User.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      throw new ApiError(400, "Password is not correct");
    }

    //user object create bina password ke
    const userData = preUser.toObject();
    delete userData.password;

    //token
    const token = jwt.sign({ user: userData }, process.env.JWT, {
      expiresIn: "7d",
    });
    // coookie -> user data pura hi bs password nhi
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000,
        // 3 days
      })
      .status(200)
      .json({
        message: "Login successful",
        user: userData,
        token,
        success: true,
      });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  // const { email, password } = req.body;
  // if (!email || !password) {
  //   return res.status(400).json({ message: "Email and password are required" });
  // }
  // try {
  //   const user = await User.findOne({ email: email });
  //   if (!user) {
  //     return res.status(404).json({ message: "User not found" });
  //   }
  //   const isMatch = await bcrypt.compare(password, user.password);
  //   if (!isMatch) {
  //     return res.status(400).json({ message: "Invalid password" });
  //   }
  //   const userData = user.toObject();
  //   delete userData.password;
  //   return res
  //     .status(200)
  //     .json({
  //       message: "Login successful",
  //       token,
  //       user: userData,
  //       success: true,
  //     });
  // } catch (err) {
  //   console.error(err);
  //   return res.status(500).json({ message: "Internal Server Error" });
  // }
};

module.exports = {
  checkIfOwnerExist,
  createUser,
  loginUser,
  // other exports can go here
};
