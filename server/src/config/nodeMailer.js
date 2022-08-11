("use strict");
require("dotenv").config();
const nodemailer = require("nodemailer");
const port = process.env.PORT;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const host = process.env.HOST;

// async..await is not allowed in global scope, must use a wrapper

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // M USING EMAIL_HOST FROM .ENV FILE HOST IS SET TO GMAIL
  port: 587, // M USING EMAIL_PORT FROM .ENV FILE PORT IS SET TO 587
  secure: false, // true for 465, false for other ports
  auth: {
    user: email, // My Orignal Gmail Account
    pass: password, // My Orignal Gmail Account Password
  },
});

// export the function
module.exports = transporter;
