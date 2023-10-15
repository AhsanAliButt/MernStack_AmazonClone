const mongoose = require("mongoose");
const DATABASE_URL = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    const DB_OPTIONS = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "shoppingApp",
    };

    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
