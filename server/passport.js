const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("./src/models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
      callbackURL: "http://localhost:8001/api/user/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Check if the user's email is already registered
        const existingUser = await User.findOne({ email: profile._json.email });

        if (existingUser) {
          if (!existingUser.fromGoogle === true) {
            // User is registered with email/password, not allowed to log in with Google
            return done(null, false, {
              message: "Already signed up with email/password",
            });
          }

          // User is already registered with Google, generate a JWT token
          const token = jwt.sign(
            { _id: existingUser.id, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "10d" }
          );
          return done(null, token);
        }
        console.log("PROFILE: " + profile._json);
        // User not found, create a new user with Google authentication
        const newUser = await User.create({
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
          name: profile._json.name,
          email: profile._json.email,
          fromGoogle: true,
          imageUrl: profile._json.picture,
          username: profile.displayName,
        });

        if (!newUser) {
          return done("Failed to create a new user");
        }

        // Generate a JWT token for the new user
        const token = jwt.sign(
          { _id: newUser.id, role: newUser.role },
          process.env.JWT_SECRET
        );

        return done(null, token);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
