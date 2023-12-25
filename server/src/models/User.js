const mongoose = require("mongoose");

// CLOUDINARY_URL=cloudinary://268511633691445:3J6YbnI4UdN9awes6-Rk-_Ki-dI@dbi6jvkot
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fromGoogle: {
    type: Boolean,
    default: false,
    required: true,
    immutable: true,
  },
  password: {
    type: String,
    required: function () {
      return this.fromGoogle !== true;
    },
  },
  dob: {
    type: String,
    required: function () {
      // Set to false if logging in from Google, true otherwise
      return !this.fromGoogle;
    },
  },
  tc: {
    type: Boolean,
    required: function () {
      // Set to false if logging in from Google, true otherwise
      return !this.fromGoogle;
    },
  },
  imageUrl: {
    type: String,
    required: function () {
      // Set to false if logging in from Google, true otherwise
      return !this.fromGoogle;
    },
  },
  country: {
    type: String,
    required: function () {
      // Set to false if logging in from Google, true otherwise
      return !this.fromGoogle;
    },
  },
  recoveryEmail: {
    type: String,
    required: function () {
      // Set to false if logging in from Google, true otherwise
      return !this.fromGoogle;
    },
  },
  zipCode: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
