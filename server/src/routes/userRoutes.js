const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const ProductController = require("../controllers/productController");

// router Middleware
//Auth Middleware
router.use("/changePassword", authMiddleware);
router.use("/currentUser", authMiddleware);
router.use("/getAllUsers", authMiddleware);
router.use("/deleteUser/:id", authMiddleware);
//Product Middleware
router.use("/addProduct", authMiddleware);

//Public Routes
//User Controllers
router.post("/register", UserController.register); //Register a new user
router.post("/login", UserController.userLogin); //Login a user
router.post("/sendEmailPasswordReset", UserController.sendEmailPasswordReset); //Send email to reset password
router.post("/resetPassword/:id/:token", UserController.userPasswordReset); //Reset password
//Product Controllers
router.get("/getAllProducts", ProductController.getAllProducts); //Get all products

//Private Routes

//User Controllers
router.post("/changePassword", UserController.changePassword); //Change password
router.get("/currentUser", UserController.currentUser); //Get current user
router.get("/getAllUsers", UserController.getAllUsers); //Get all users
router.delete("/deleteUser/:id", UserController.deleteUser); //Delete user
//Product Controllers
router.post("/addProduct", ProductController.createProduct); //Add product

module.exports = router;
