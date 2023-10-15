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
router.get("/getProductById/:productId", ProductController.getProductById); //Get product by id
router.get(
  "/getProductsByCategory/:category",
  ProductController.getProductByCategory
); //Get products by category
router.get("/getProductsByBrand/:brand", ProductController.getProductsByBrand); //Get products by Brand
router.get(
  "/getProductsBySearch/:search",
  ProductController.getProductBySearch
); //Get products by search
router.get("/getProductsByPrice/:price", ProductController.getProductByPrice); //Get products by price
router.get("/getProductByName/:name", ProductController.getProductByName); //Get products by name

//Protecting the routes with the authentication middleware
router.post("/addProduct", ProductController.createProduct); //Add product
router.put("/updateProduct/:id", ProductController.updateProduct); //Update product
router.delete("/deleteProduct/:id", ProductController.deleteProduct); //Delete product

module.exports = router;
