const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String },
  birthDate: Date,
  isGoogleUser: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
