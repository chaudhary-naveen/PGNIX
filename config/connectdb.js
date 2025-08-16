const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    const databaseInstance = await mongoose.connect(process.env.MONGO_URL);

    console.log(
      `Connected to MongoDB !! HOST : ${databaseInstance.connection.host}`
    );
  } catch (error) {
    console.log(`Db Connection Failed :`, error);
    process.exit(1);
  }
};

module.exports = connectdb;
