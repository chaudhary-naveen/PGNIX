// const dotenv = require("dotenv");
// dotenv.config();
// const mongoose = require("mongoose"); // Atlas URL

// const connectdb = async () => {
//   mongoose.set("strictQuery", false);
//   await mongoose.connect(process.env.MONGO_URL);

//   // ye depreicated hi ab use nhi hota bhai
//   // , {
//   //     useNewUrlParser: true,
//   //     useUnifiedTopology: true,
//   // }

//   const db = mongoose.connection;
//   db.on("error", console.error.bind(console, "connection error:"));
//   db.once("open", () => {
//     console.log("\nDB connected\nEnjoy Surfing");
//   });
// };

// module.exports = connectdb;
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
