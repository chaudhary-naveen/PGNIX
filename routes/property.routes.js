const express = require("express");
const router = express.Router();
const {
  AddPg,
  editPg,
  getAllPersonalPg,
  getGivenPg,
  removePg,
  filterPg,
  getAllPg,
} = require("../controller/Pg.controller");
const isOwner = require("../middleware/isOwner.middleware");
const { auth } = require("../middleware/auth.js");
const { upload } = require("../middleware/multer.middleware");

router.get("/seeall", getAllPg);
// ******************Private Routes (owner)*************************

//add new pg
// Post
// api / v1 / owner / pg / add;

//only 5 photos will be added at a time
//frontend de images field naam se hi bhejna

// upload krne se phile check kr le ki login hi then owner hi hai ya user to nhi
router.post("/add", auth, upload.array("images", 5), AddPg);

//Edit pg
//put
// api/v1/owner/pg/edit
router.patch("/edit/:id", auth, editPg);

//see all personal pg
// get
// api / v1 / owner / pg / all/;
router.get("/all", auth, getAllPersonalPg);

// delete given pg
// delete
// api/v1/owner/pg/delete/:id
router.delete("/delete/:id", auth, removePg);

// ***************************Public Routes*********************8
//see particuar pg
//Get
//api/v1/owner/pg/:id
router.get("/:id", getGivenPg);

// see all pg
//api/v1/owner/pg/seeall

// filter pg
// Get
router.get("/search/pg", filterPg);

// ####rest according to need add krenge apn log############

module.exports = router;
