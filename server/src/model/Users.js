// src/model/Users.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  birthDate: { type: Date } // ✅ NEW FIELD
}, { timestamps: true });

module.exports = mongoose.model('Users', userSchema);
