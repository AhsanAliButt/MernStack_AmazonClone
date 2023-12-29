const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

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
router.post("/getUserByToken/:token", UserController.userDetailsByToken); //Get current user
router.post("/signOut", UserController.signOut); //LogOut a user

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
router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      console.error(err);
      return res.redirect("/error");
    }
    if (!user) {
      console.error(info);
      return res.redirect("http://localhost:3000/signIn/");
    }

    // Update user information in the session
    console.log("User information:", user);
    req.session.user = user;
    console.log("User information:", user);
    // Redirect with user data as query parameters
    const redirectUrl = `http://localhost:3000/?token=${user}`;
    return res.redirect(redirectUrl);
    // return res.redirect("http://localhost:3000/");
  })(req, res, next);
});

module.exports = router;
