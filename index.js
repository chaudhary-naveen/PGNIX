require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectdb = require("./config/connectdb.js");

// const dummy_routes = require("./routes/dummyroutes.js");

const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 5001;

const routes = require("./routes/routes.js");
const userRoute = require("./routes/user.routes.js");
const ownerRoutes = require("./routes/owner.routes.js");
const pgRoutes = require("./routes/property.routes.js");
const filterPg = require("./routes/filterPg.routes.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/owner", ownerRoutes);
app.use("/api/v1/pg", pgRoutes);
app.use("/api/v1/pg/filter", filterPg);
app.use("/api", routes);

// DataBase Connection
connectdb();
app.listen(port, () => {
  console.log(`run on the this ${port}`);
});

module.exports = app;
