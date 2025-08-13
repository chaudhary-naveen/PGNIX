const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("Working fine v.1.0")
})

module.exports = router;
