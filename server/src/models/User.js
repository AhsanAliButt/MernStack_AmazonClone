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
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  tc: {
    type: Boolean,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: true,
  },
  recoveryEmail: {
    type: String,
    required: true,
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
