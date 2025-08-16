const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const dir = path.join(__dirname, "public/temp");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

//create a multer diskstorage storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/temp");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = uuidv4() + "-" + Date.now();
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});
module.exports = { upload };
