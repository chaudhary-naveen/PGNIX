const express = require("express");
const router = express();
const { createUser, deleteUser, loginUser } = require();
//create user ->POST
// api/v1/user/create
router.post("/create", createUser);

// login user ->post
// api/v1/user/login
router.post("/login", loginUser);

// logout user ->get
// api/v1/user/logout
router.get("/logouot", logoutUser);

//delete user ->delete
// api/v1/user/delete
router.delete("/create/:id", deleteUser);

module.exports = router;
