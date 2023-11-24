const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("./src/models/User");

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
//       callbackURL: "/userRoutes/google/callback",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       const getUser = async () => {
//         const [user] = await User.findOne({ email: profile._json.email });

//         if (user?.fromGoogle == false) {
//           return cb(null, false, {
//             message: "already sign with email password",
//           });
//         }
//         if (user?.fromGoogle) {
//           const token = jwt.sign(
//             { _id: user.id, role: user.role },
//             process.env.JWT_SECRET,
//             {
//               expiresIn: "15d",
//             }
//           );
//           cb(null, token);
//           return;
//         }
//         const [newUser, newErr] = await User.create({
//           email: profile._json.email,
//           fromGoogle: true,
//           googleAvatar: profile._json.picture,
//           username: profile.displayName,
//         });

//         if (!newUser) return cb(newErr || "something failed");
//         const token = jwt.sign(
//           { _id: newUser.id, role: newUser.role },
//           process.env.JWT_SECRET
//         );
//         cb(null, token);
//       };
//       getUser();
//     }
//   )
// );
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
      callbackURL: "api/user/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
