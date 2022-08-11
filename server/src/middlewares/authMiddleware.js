const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const secret = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  let authorization =
    req.headers["x-access-token"] || req.headers["authorization"];
  if (authorization && authorization.startsWith("Bearer ")) {
    try {
      authorization = authorization.split(" ")[1];
      console.log("AUTHORIZATION", authorization);
      // Verify Token
      const decoded = jwt.verify(authorization, secret);
      console.log("DECODE", decoded);
      const user = await UserModel.findById(decoded._id).select("-password");
      console.log("USER", user);
      if (!user) {
        return res.status(404).json({
          status: "Status Failed",
          message: "User not found",
        });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({
        status: "Status Failed",
        message: "Unable to authenticate user",
      });
    }
  }
  if (!authorization) {
    return res.status(401).json({
      status: "Status Failed",
      message: "No token, authorization denied",
    });
  }
};
module.exports = authMiddleware;
