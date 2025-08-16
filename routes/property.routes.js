const express = require("express");
const router = express.Router();
const {
  AddPg,
  editPg,
  getAllPg,
  getGivenPg,
  removePg,
  filterPg,
} = require("../controllers/Pg.controller");
const { upload } = require("../middleware/multer.middleware");

// ******************Private Routes (owner)*************************

//add new pg
// Post
// api / v1 / owner / pg / add;

//only 5 photos will be added at a time
//frontend de images field naam se hi bhejna
router.post("/add", upload.array("images", 5), AddPg);

//Edit pg
//put
// api/v1/owner/pg/edit
router.put("/edit", editPg);

//see all personal pg
// get
// api / v1 / owner / pg / all/;
router.get("/all", getAllPg);

// delete given pg
// delete
// api/v1/owner/pg/delete/:id
router.delete("/delete/:id", removePg);

// ***************************Public Routes*********************8
//see particuar pg
//Get
//api/v1/owner/pg/:id
router.get("/:id", getGivenPg);

// filter pg
// Get
router.get("/search/pg", filterPg);

// ####rest according to need add krenge apn log############

module.exports = router;
