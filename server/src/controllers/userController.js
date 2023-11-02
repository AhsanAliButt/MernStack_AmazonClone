const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const secret = process.env.JWT_SECRET;
const transporter = require("../config/nodeMailer");
const otpGenerator = require("otp-generator");
const cloudinary = require("cloudinary").v2;
const cloudinarySecret = process.env.CLOUDNARY_API_SECRET;
cloudinary.config({
  cloud_name: "dbi6jvkot",
  api_key: "268511633691445",
  api_secret: cloudinarySecret,
});

const UserController = {
  register: async (req, res) => {
    const file = req.files?.photo;
    console.log("File Object:", file); // Log the file object to verify its contents

    try {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "profilePictures",
      });

      const {
        firstName,
        lastName,
        name,
        email,
        password,
        tc,
        recoveryEmail,
        country,
        zipCode,
        dob,
        photo,
      } = req.body;
      console.log(photo);
      const checkUser = await UserModel.findOne({ email: email });

      if (checkUser) {
        return res.status(400).json({
          message: "User already exists",
        });
      } else {
        if (!name || !email || !password || !tc) {
          return res.status(400).json({
            status: 400,
            message: "Please fill all fields",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password, salt);
          const user = new UserModel({
            firstName: firstName,
            lastName: lastName,
            name: name,
            email: email,
            password: hash,
            dob: dob,
            tc: tc,
            imageUrl: result.url || "", // Use the URL from Cloudinary
            recoveryEmail: recoveryEmail,
            country: country,
            zipCode: zipCode,
          });

          await user.save();
          const savedUser = await UserModel.findOne({ email: email });
          const token = jwt.sign({ _id: savedUser._id }, secret, {
            expiresIn: "1d",
          });

          res.cookie("AmazonWeb", token, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
          });

          res.status(200).json({
            status: 200,
            message: "User registered successfully",
            token: token,
            user: {
              firstname: savedUser?.firstName,
              lastName: savedUser?.lastName,
              imageUrl: savedUser?.imageUrl,
              name: savedUser?.name,
              _id: savedUser?._id,
              email: savedUser?.email,
              dob: savedUser?.dob,
              zipcode: savedUser?.zipCode,
              country: savedUser?.country,

              // Include other user data as needed
            },
          });
        }
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        status: 400,
        message: "Server error",
      });
    }
  },
  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          status: 400,
          message: "Please fill all fields",
        });
      }

      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return res.status(400).json({
          status: 400,
          message: "User not found",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          status: 400,
          message: "Invalid credentials",
        });
      }

      const token = jwt.sign({ _id: user._id }, secret, {
        expiresIn: "15d",
      });

      // Set the cookie before sending the JSON response
      res.cookie("AmazonWeb", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });

      // Now, send the JSON response
      return res.status(200).json({
        status: 200,
        message: "Login successful",
        token: token,
        user: {
          firstname: user?.firstName,
          lastName: user?.lastName,
          imageUrl: user?.imageUrl,
          name: user?.name,
          _id: user?._id,
          email: user?.email,
          dob: user?.dob,
          zipcode: user?.zipCode,
          country: user?.country,
          // Include other user data as needed
        },
        // cart: cart, // Include cart items
      });
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
        status: 200,
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
          status: 400,
          message: "Please fill all fields",
        });
      } else {
        if (newPassword !== newPassword_confirm) {
          return res.status(400).json({
            status: 400,
            message: "New Passwords do not match",
          });
        }
        const checkPassword = await bcrypt.compare(password, newPassword);
        if (password === newPassword) {
          return res.status(400).json({
            status: 400,
            message: "You can't set same Password as old Password",
          });
        } else {
          const user = await UserModel.findOne({ _id: req.user._id });
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).json({
              status: 400,
              message: "Invalid credentials",
            });
          } else {
            const salt = await bcrypt.genSalt(10);
            const newHash = await bcrypt.hash(newPassword, salt);
            await UserModel.findByIdAndUpdate(user._id, {
              password: newHash,
            });
            return res.status(200).json({
              status: 200,
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
        status: 200,
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
        status: 200,
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
      console.log("EMAILLLLLL", email);
      if (!email) {
        return res.status(400).json({
          status: 400,
          message: "Please Email Field",
        });
      } else {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
          return res.status(400).json({
            status: 400,
            message: "User not found",
          });
        } else {
          const topSecret = user._id + secret;
          const token = jwt.sign({ _id: user._id }, topSecret, {
            expiresIn: "1h",
          });
          const link = `http://localhost:3000/reset-password/${user._id}/${token}`;
          console.log("Link", link);
          const mailOptions = {
            from: '"Fred Foo 👻" <ahsanbutt515@gmail.com>',
            to: "ahsanbutt515@gmail.com",
            subject: "Password Reset",
            html: `<h1>Password Reset</h1>
            <p>Click this link to reset your password</p>
            <a href="${link}">${link}</a>`,
          };
          console.log("MAIL OPTIONS", mailOptions);
          try {
            await transporter.sendMail(mailOptions);
            return res.status(200).json({
              status: 200,
              message: "Email sent",
            });
          } catch (error) {
            return res.status(500).json({
              status: 500,
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
      const { newPassword, confirmNewPassword } = req.body;
      console.log(`User password reset`, newPassword, confirmNewPassword);
      const { token } = req.params;
      if (!confirmNewPassword || !newPassword) {
        return res.status(400).json({
          status: 400,
          message: "Please fill all fields",
        });
      } else {
        if (newPassword !== confirmNewPassword) {
          return res.status(400).json({
            status: 400,
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
            status: 200,
            message: "Password changed successfully",
          });
        } catch (error) {
          res.status(401).json({
            status: 401,
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

  OtpGenerator: async (req, res) => {
    try {
      let otp = await otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });

      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          status: 400,
          message: "Please fill all fields",
        });
      }

      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return res.status(400).json({
          status: 400,
          message: "User not found",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          status: 400,
          message: "Invalid credentials",
        });
      }

      const token = jwt.sign({ _id: user._id }, secret, {
        expiresIn: "15d",
      });

      // Set the cookie before sending the JSON response
      res.cookie("AmazonWeb", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });

      // Now, send the JSON response
      return res.status(200).json({
        status: 200,
        message: "Login successful",
        token: token,
        user: {
          firstname: user?.firstName,
          lastName: user?.lastName,
          imageUrl: user?.imageUrl,
          name: user?.name,
          _id: user?._id,
          email: user?.email,
          dob: user?.dob,
          zipcode: user?.zipCode,
          country: user?.country,
          // Include other user data as needed
        },
        // cart: cart, // Include cart items
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};
module.exports = UserController;
