const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");

router.get('/',(req,res)=>{
    res.send("Working fine v.1.9")
})

module.exports = router;
