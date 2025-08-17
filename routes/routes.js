const express = require("express");
const {
  checkIfOwnerExist,
  createUser,
  loginUser,
  getUserDetails,
} = require("../controller/user.controller");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User Routes Working");
});

router.get("/active", (req, res) => {
  console.log("A Client is connected");
  res.send("Working fine v.1.1");
});

router.get("/exist", checkIfOwnerExist);
router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/getuserdetail", auth, getUserDetails);

module.exports = router;
