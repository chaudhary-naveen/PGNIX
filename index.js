const express = require("express");
const cors = require("cors");
const connectdb = require("./config/connectdb.js");

const routes = require("./routes/routes.js");
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

// app.use(express.static(path.join(__dirname, 'client','build')));

app.use('/api',routes);

app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname,'client','build','index.html'));
  res.send("Hi, Myself is Naveen !!");
});

const server = app.listen(port, () => {
  console.log(`run on the ${port}`);
});

module.exports = app;