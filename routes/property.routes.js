const express = require("express");
const router = express.Router();
const {
  AddPg,
  editPg,
  getAllPg,
  getGivenPg,
  removePg,
} = require("../controllers/Pg.controller");

// ******************Private Routes (owner)*************************

//add new pg
// Post
// api / v1 / owner / pg / add;
router.post("/add", AddPg);

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

// ####rest according to need add krenge apn log############

router.module.exports = router;
