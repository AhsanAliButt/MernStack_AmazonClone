const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const ProductController = require("../controllers/productController");

//Product Middleware
router.use("/addProduct", authMiddleware);
router.use("/updateProduct", authMiddleware);
router.use("/deleteProduct", authMiddleware);
//UnProtected Routes (No Auth Middleware)
router.get("/getAllProducts", ProductController.getAllProducts); //Get all products
//Protecting the routes with the authentication middleware
router.post("/addProduct", ProductController.createProduct); //Add product
router.put("/updateProduct/:id", ProductController.updateProduct); //Update product
router.delete("/deleteProduct/:id", ProductController.deleteProduct); //Delete product

module.exports = router;
