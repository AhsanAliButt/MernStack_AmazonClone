const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const passport = require("passport");

// router Middleware
//Auth Middleware
router.use("/changePassword", authMiddleware);
router.use("/currentUser", authMiddleware);
router.use("/getAllUsers", authMiddleware);
router.use("/deleteUser/:id", authMiddleware);

//Public Routes
//User Controllers
router.post("/register", UserController.register); //Register a new user
router.post("/login", UserController.userLogin); //Login a user
router.post("/sendEmailPasswordReset", UserController.sendEmailPasswordReset); //Send email to reset password
router.post("/resetPassword/:id/:token", UserController.userPasswordReset); //Reset password

//Private Routes

//User Controllers
router.post("/changePassword", UserController.changePassword); //Change password
router.get("/currentUser", UserController.currentUser); //Get current user
router.get("/getAllUsers", UserController.getAllUsers); //Get all users
router.delete("/deleteUser/:id", UserController.deleteUser); //Delete user
router.post("/updateUser", UserController.updateUserDetails); //Change password
// google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_SUCCESS_LOGIN_URL,
    failureRedirect: process.env.CLIENT_FAIL_LOGIN_URL + "/?err=emailExists",
  })
);

module.exports = router;
