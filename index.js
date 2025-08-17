require("dotenv").config();
const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectdb = require("./config/connectdb.js");
const routes = require("./routes/routes.js");
const userRoute = require("./routes/user.routes.js");
const ownerRoutes = require("./routes/owner.routes.js");
const pgRoutes = require("./routes/property.routes.js");
const filterPg = require("./routes/filterPg.routes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/pg/filter", filterPg);
app.use("/api/v1/owner", ownerRoutes);
app.use("/api/v1/pg", pgRoutes);
app.use("/api", routes);

// DB connection
connectdb();


module.exports = app;
module.exports.handler = serverless(app);
