require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT;
const cors = require("cors");
const connectDB = require("./src/config/connectdb");
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const Product = require("./src/models/product"); // Import your Mongoose model
const pluralize = require("pluralize");
// Import the necessary modules and your Mongoose model

// async function updateBrandsForProducts() {
//   try {
//     // Fetch all products
//     const products = await Product.find();

//     // Update each product with the brand based on its name
//     for (const product of products) {
//       // Implement logic to extract the brand from the product name
//       const brand = extractBrandFromName(product.name.toLowerCase());

//       // Capitalize the first letter of the brand
//       product.brand = capitalizeFirstLetter(brand);
//       await product.save();
//     }

//     console.log("Brands updated for all products.");
//   } catch (error) {
//     console.error("Error updating brands:", error);
//   }
// }

// function extractBrandFromName(productName) {
//   // Implement the logic to extract the brand from the product name here.
//   // This could involve string manipulation, regular expressions, or custom logic
//   // based on your specific product naming conventions.

//   // Example: Extracting brand from a name with a known pattern.
//   // Replace this with your actual logic.
//   const regex = /(\w+) \w+/;
//   const match = productName.match(regex);
//   if (match) {
//     return match[1];
//   }

//   return ""; // Default value if no brand is found
// }

// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }

// updateBrandsForProducts();

// async function updateExistingProductsCompanyField() {
//   try {
//     const updatedCompanyValue = "Keywords"; // Set the company value

//     // Update all documents with the new "company" field
//     const result = await Product.updateMany(
//       {},
//       { $set: { keywords: updatedCompanyValue } }
//     );

//     console.log(
//       `${result.modifiedCount} products were updated with the "company" field.`
//     );
//   } catch (error) {
//     console.error("Error updating products:", error);
//   }
// }

// updateExistingProductsCompanyField();
// function preprocessAndSaveProduct(productData) {
//   const product = new Product(productData);
//   // Create variations of the product name (e.g., "mobile" and "mobiles")
//   product.keywords = createKeywordVariations(product.name);
//   return product.save();
// }

// function createKeywordVariations(name) {
//   // Implement your logic to generate keyword variations, e.g., stemming or synonym mapping.
//   // For example, you can use libraries like `natural` or other NLP tools.
//   // Here's a simple example using pluralization:
//   return [name, pluralize(name)];
// }

// Example usage:
// Example product data with variations of the product name
// const productData = {
//   user: userId, // Replace with the actual user ID
//   brand: "Brand Name",
//   company: "Company Name",
//   name: "Mobile",
//   description: "Product description",
//   price: 499.99,
//   category: "Electronics",
//   imageUrl: "product-image.jpg",
//   reviews: [], // Add reviews if needed
//   stock: 100,
//   keywords: ["Mobile", "Mobiles"], // Store variations of the product name
// };

// preprocessAndSaveProduct(productData);

// const orderRoutes = require("./src/routes/orderRoutes");

// const Product = require("./src/models/product"); // Import your Mongoose model

// Cors Policy
app.use(cors());
//JSON Parser
app.use(express.json());

//Connect to MongoDB
connectDB();

//Routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
// app.use("/api/order", orderRoutes);

//RUn Server
app.listen(port, (res, req) => {
  console.log(`Server is running on port ${port}`);
});
