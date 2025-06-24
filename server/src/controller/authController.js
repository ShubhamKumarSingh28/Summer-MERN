// src/controller/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/Users'); // Adjusted path if needed
const secret = "e969c6cf-42a7-4f98-82e1-f195518edfb7";

const authController = {
  // ----------------------------
  // LOGIN
  // ----------------------------
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const tokenPayload = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email
      };

      const token = jwt.sign(tokenPayload, secret, { expiresIn: '1h' });

      res.cookie('jwtToken', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax'
      });

      res.json({ message: "Login successful", user: tokenPayload });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Login failed" });
    }
  },

  // ----------------------------
  // SIGNUP + AUTO-LOGIN
  // ----------------------------
  signup: async (req, res) => {
    const { firstName, lastName, email, password, birthDate } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        birthDate: birthDate ? new Date(birthDate) : undefined,
      });

      const tokenPayload = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email
      };

      const token = jwt.sign(tokenPayload, secret, { expiresIn: '1h' });

      res.cookie('jwtToken', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax'
      });

      res.status(201).json({ message: "Signup successful", user: tokenPayload });
    } catch (err) {
      console.error("Signup error:", err);
      res.status(500).json({ message: "Signup failed" });
    }
  },

  // ----------------------------
  // LOGOUT
  // ----------------------------
  logout: (req, res) => {
    res.clearCookie('jwtToken');
    res.json({ message: "Logged out successfully" });
  },

  // ----------------------------
  // CHECK LOGIN STATUS
  // ----------------------------
  isUserLoggedIn: (req, res) => {
    const token = req.cookies.jwtToken;

    if (!token) {
      return res.status(401).json({ message: "User not logged in" });
    }

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        res.json({ message: "User is logged in", user });
      }
    });
  }
};

module.exports = authController;
