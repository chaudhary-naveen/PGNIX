const express = require("express");
const cors = require("cors");
const connectdb = require("./config/connectdb.js");

const routes = require("./routes/routes.js");
const dummy_routes = require("./routes/dummyroutes.js");

const cookieParser = require("cookie-parser");
const path = require('path');
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// DataBase Connection
connectdb();

app.use(express.static(path.join(__dirname, 'client','dist')));

app.use('/api',routes);
app.use('/demo',dummy_routes);

const server = app.listen(port, () => {
  console.log(`run on the this ${port}`);
});

module.exports = app;