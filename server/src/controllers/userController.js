const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const secret = process.env.JWT_SECRET;
const transporter = require("../config/nodeMailer");

const UserController = {
  register: async (req, res) => {
    console.log("register");
    const { name, email, password, age, tc,photo } = req.body;
    const checkUser = await UserModel.findOne({ email: email });
    if (checkUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    } else {
      if (!name || !email || !password || !age || !tc) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Please fill all fields",
        });
      } else {
        try {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password, salt);
          const user = new UserModel({
            name: name,
            email: email,
            password: hash,
            age: age,
            tc: tc,
          });
          await user.save();
          const savedUser = await UserModel.findOne({ email: email });
          const token = jwt.sign({ _id: savedUser._id }, secret, {
            expiresIn: "1d",
          });
          res.status(200).json({
            status: "Status Success",
            message: "User registered successfully",
            token: token,
          });
        } catch (error) {
          console.log(error.message);
          res.status(500).json({
            status: "Status Failed",
            message: "Server error",
          });
        }
      }
    }
  },
  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Please fill all fields",
        });
      } else {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
          return res.status(400).json({
            status: "Status Failed",
            message: "User not found",
          });
        } else {
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).json({
              status: "Status Failed",
              message: "Invalid credentials",
            });
          } else {
            const token = jwt.sign({ _id: user._id }, secret, {
              expiresIn: "15d",
            });
            // Retrieve the user's cart items
            // const cart = await CartModel.findOne({ user: user._id });

            return res.status(200).json({
              status: "Status Success",
              message: "Login successful",
              token: token,
              user: {
                name: user.name,
                _id: user._id,
                email: user.email,
                // Include other user data as needed
              },
              // cart: cart, // Include cart items
            });
          }
        }
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await UserModel.find();
      return res.status(200).json({
        status: "Status Success",
        message: "Users found",
        users: users,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { password, newPassword, newPassword_confirm } = req.body;
      if (!newPassword_confirm || !newPassword || !password) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Please fill all fields",
        });
      } else {
        if (newPassword !== newPassword_confirm) {
          return res.status(400).json({
            status: "Status Failed",
            message: "New Passwords do not match",
          });
        }
        const checkPassword = await bcrypt.compare(password, newPassword);
        if (password === newPassword) {
          return res.status(400).json({
            status: "Status Failed",
            message: "You can't set same Password as old Password",
          });
        } else {
          const user = await UserModel.findOne({ _id: req.user._id });
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).json({
              status: "Status Failed",
              message: "Invalid credentials",
            });
          } else {
            const salt = await bcrypt.genSalt(10);
            const newHash = await bcrypt.hash(newPassword, salt);
            await UserModel.findByIdAndUpdate(user._id, {
              password: newHash,
            });
            return res.status(200).json({
              status: "Status Success",
              message: "Password changed successfully",
            });
          }
        }
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  currentUser: async (req, res) => {
    try {
      const user = await UserModel.findById(req.user._id);
      return res.status(200).json({
        status: "Status Success",
        message: "User found",
        user: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await UserModel.findById(req.user._id);
      await UserModel.findByIdAndDelete(user._id);
      return res.status(200).json({
        status: "Status Success",
        message: "User deleted",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  sendEmailPasswordReset: async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Please Email Field",
        });
      } else {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
          return res.status(400).json({
            status: "Status Failed",
            message: "User not found",
          });
        } else {
          const topSecret = user._id + secret;
          const token = jwt.sign({ _id: user._id }, topSecret, {
            expiresIn: "1h",
          });
          const link = `http:///127.0.0.1:3000/api/user/reset-password/${user._id}/${token}`;
          console.log(link);
          const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: "Password Reset",
            html: `<h1>Password Reset</h1>
            <p>Click this link to reset your password</p>
            <a href="${link}">${link}</a>`,
          };
          console.log("MAIL OPTIONS", mailOptions);
          try {
            await transporter.sendMail(mailOptions);
            return res.status(200).json({
              status: "Status Success",
              message: "Email sent",
            });
          } catch (error) {
            return res.status(500).json({
              status: "Status Failed",
              message: error.message,
            });
          }
        }
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  userPasswordReset: async (req, res) => {
    try {
      const { newPassword, newPassword_confirm } = req.body;
      const { token } = req.params;
      if (!newPassword_confirm || !newPassword) {
        return res.status(400).json({
          status: "Status Failed",
          message: "Please fill all fields",
        });
      } else {
        if (newPassword !== newPassword_confirm) {
          return res.status(400).json({
            status: "Status Failed",
            message: "New Passwords do not match",
          });
        }
        const user = await UserModel.findById(req.params.id);
        const topSecret = user._id + secret;
        try {
          jwt.verify(token, topSecret);
          const salt = await bcrypt.genSalt(10);
          const newHash = await bcrypt.hash(newPassword, salt);
          await UserModel.findByIdAndUpdate(user._id, {
            password: newHash,
          });
          return res.status(200).json({
            status: "Status Success",
            message: "Password changed successfully",
          });
        } catch (error) {
          res.status(401).json({
            status: "Status Failed",
            message: "Invalid Token",
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};

module.exports = UserController;
