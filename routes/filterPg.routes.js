const express = require("express");
const router = express.Router();
const { filterPg } = require("../Controllers/Pg.controller");

router.get("/", filterPg);

// exapleGET /api/pg/filter?location=delhi
// GET /api/pg/filter?propertyName="ashu"%20house
// GET /api/pg/filter?minRent=5000&maxRent=10000
// GET /api/pg/filter?co_ed=true&isFurnished=false
// GET /api/pg/filter?roomTypes=single,double

module.exports = router;

