// ("use strict");
// const nodemailer = require("nodemailer");
// const port = process.env.PORT;
// const email = process.env.EMAIL;
// const password = process.env.PASSWORD;
// const host = process.env.HOST;

// // async..await is not allowed in global scope, must use a wrapper

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   auth: {
//     user: "maximillian.gutkowski@ethereal.email",
//     pass: "nzdev1gb4hzQgbkdpt",
//   },
// });

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <maximillian.gutkowski@ethereal.email>', // sender address
//     to: "bar@example.com, ahsanbutt515@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   //
//   // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
//   //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
//   //       <https://github.com/forwardemail/preview-email>
//   //
// }

// main().catch(console.error);

// // export the function
// module.exports = transporter;

("use strict");
const nodemailer = require("nodemailer");
const port = process.env.PORT;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const host = process.env.HOST;

// async..await is not allowed in global scope, must use a wrapper

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "ahsanbutt515@gmail.com",
    pass: "seem bghe rdou hrjy",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  // const info = await transporter.sendMail({
  //   from: '"Fred Foo 👻" <ahsanbutt515@gmail.com>', // sender address
  //   to: "ahsanbutt515@gmail.com", // list of receivers
  //   subject: "Hello ✔", // Subject line
  //   text: "Hello world?", // plain text body
  //   html: "<b>Hello world?</b>", // html body
  // });
  // console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

main().catch(console.error);

// export the function
module.exports = transporter;
