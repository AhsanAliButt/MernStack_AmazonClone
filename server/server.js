require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT;
const cors = require("cors");
const connectDB = require("./src/config/connectdb");
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const Product = require("./src/models/product"); // Import your Mongoose model
const pluralize = require("pluralize");
const User = require("./src/models/User");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const { faker } = require("@faker-js/faker");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./passport");
// faker.context.aspect();

///////////////
// Function to generate random product data
// Function to generate random product data
// const generateProduct = () => ({
//   user: "62f12f9296b98b652b6cac93",
//   brand: faker.commerce.product,
//   keywords: faker.lorem.words(3), // Generates an array of 3 random words
//   company: faker.company.name,
//   name: faker.commerce.productName(),
//   description: faker.commerce.productDescription(),
//   price: faker.commerce.price(),
//   category: faker.commerce.department(),
//   imageUrl: faker.image.imageUrl(),
//   reviews: [
//     {
//       user: "62f12f9296b98b652b6cac93",
//       name: "Ahsan",
//       comment: faker.lorem.sentence(),
//       rating: Math.floor(Math.random() * 5) + 1,
//     },
//   ],
//   stock: Math.floor(Math.random() * 100) + 1,
// });

// // Array to store 100 products
// const products = [];

// // Generate 100 products
// for (let i = 0; i < 100; i++) {
//   products.push(generateProduct());
// }

// // Insert products into the database
// Product.insertMany(products)
//   .then((result) => {
//     console.log(`${result.length} products inserted successfully.`);
//   })
//   .catch((error) => {
//     console.error("Error inserting products:", error);
//   })
//   .finally(() => {
//     // Close the MongoDB connection
//     mongoose.connection.close();
//   });
// const randomName = faker.commerce.productName(); // Rowan Nikolaus
// console.log("Successfully inserted products", randomName);

////////////////

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
//     dob = "24-08-1988";
//     country = "Pakistan";
//     zipCode = "12345";
//     recoveryEmail = "ahsanbutt515@gmail.com";

//     // Update all documents with the new "company" field
//     const result = await User.updateMany(
//       {},
//       {
//         $set: {
//           dob: dob,
//           country: country,
//         },
//       }
//     );

//     console.log(`${result.modifiedCount} Users were updated with the field.`);
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

// // const orderRoutes = require("./src/routes/orderRoutes");
// const updateExistingUsers = async () => {
//   try {
//     // Update all existing users to have fromGoogle with a default value of false
//     const { nModified } = await User.updateMany(
//       { fromGoogle: { $eq: undefined } },
//       { $set: { fromGoogle: false } }
//     );

//     if (nModified !== undefined) {
//       console.log(`${nModified} existing users updated successfully.`);
//     } else {
//       console.log("No existing users found to update.");
//     }
//   } catch (error) {
//     console.error("Error updating existing users:", error);
//   }
// };

// // Call the function to update existing users
// updateExistingUsers();

// async function updateExistingUsers() {
//   try {
//     // Update all documents with the new "fromGoogle" field set to false
//     const result = await User.updateMany(
//       { fromGoogle: { $exists: false } },
//       { $set: { fromGoogle: false } }
//     );

//     if (result.ok === 1) {
//       console.log(`${result.nModified} Users were updated with the field.`);
//     } else {
//       console.log("Update operation did not succeed:", result);
//     }
//   } catch (error) {
//     console.error("Error updating users:", error);
//   }
// }

// updateExistingUsers();
// Cors Policy
// app.use(
//   cors(
//     {
//     origin: [process.env.CLIENT_URL, process.env.CLIENT_URL + "/"],
//     methods: "GET,POST,PUT,PATCH,DELETE",
//     credentials: true,
//   }
//   )
// );

// app.use(
//   cors(function (req, callback) {
//     console.log(req.headers);
//     let corsOptions;
//     if (req.header("Origin") === process.env.CLIENT_URL) {
//       corsOptions = { origin: true, credentials: true };
//     } else {
//       corsOptions = { origin: false };
//     }
//     callback(null, corsOptions);
//   })
// );

// cookieStore
app.use(
  cookieSession({
    name: "session",
    keys: ["Matrix"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
// Cors Policy
app.use(cors());
//JSON Parser
app.use(express.json());
// // Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());
//Cookie Parser
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
//Passport
app.use(passport.initialize());
app.use(passport.session());
//Connect to MongoDB
connectDB();
// // Cors Policy
// app.use(cors());
// //JSON Parser
// app.use(express.json());
// app.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// );

// //Connect to MongoDB
// connectDB();
// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());
//Routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
// app.use("/api/order", orderRoutes);

//RUn Server
app.listen(port, (res, req) => {
  console.log(`Server is running on port ${port} `);
  console.log("error", process.env.CLIENT_URL);
});
