const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const secret = process.env.JWT_SECRET;
const expiredTokens = new Set();

const authMiddleware = async (req, res, next) => {
  let authorization =
    req.headers["x-access-token"] || req.headers["authorization"];
  if (authorization && authorization.startsWith("Bearer ")) {
    try {
      authorization = authorization.split(" ")[1];
      console.log("AUTHORIZATION", authorization);
      // Check if the token is in the list of expired tokens
      // This is a security check to ensure user requests will not entertained if he is already signOut
      // So no one can use his token for security breach
      if (expiredTokens.has(authorization)) {
        return res.status(401).json({
          status: 401,
          message: "Unauthorized: Token has been invalidated",
        });
      }
      // Verify Token
      const decoded = jwt.verify(authorization, secret);
      console.log("DECODE", decoded);
      const user = await UserModel.findById(decoded._id).select("-password");
      console.log("USER", user);
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Unable to authenticate user",
      });
    }
  }
  if (!authorization) {
    return res.status(401).json({
      status: 401,
      message: "No token, authorization denied",
    });
  }
};

const localVariables = (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};
module.exports = authMiddleware;
