const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    const DB_OPTIONS = {
      dbName: "shoppingApp",
    };
    mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("MongoDB connected...");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
