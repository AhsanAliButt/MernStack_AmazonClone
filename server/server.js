require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT;
const cors = require("cors");
const connectDB = require("./src/config/connectdb");
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");

// Cors Policy
app.use(cors());
//JSON Parser
app.use(express.json());

//Connect to MongoDB
connectDB();

//Routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

//RUn Server
app.listen(port, (res, req) => {
  console.log(`Server is running on port ${port}`);
});
