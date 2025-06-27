// src/controller/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const { validationResult } = require('express-validator');
const User = require('../model/Users');

const secret = process.env.JWT_SECRET;
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

if (!secret) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1); // Exit immediately if secret is missing
}

const authController = {
  // ----------------------------
  // LOGIN
  // ----------------------------
  login: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const tokenPayload = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      };

      const token = jwt.sign(tokenPayload, secret, { expiresIn: '1h' });

      res.cookie('jwtToken', token, {
        httpOnly: true,
        secure: false, // set true if HTTPS
        sameSite: 'Lax',
      });

      res.json({ message: 'Login successful', user: tokenPayload });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Login failed' });
    }
  },

  // ----------------------------
  // SIGNUP
  // ----------------------------
  signup: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, birthDate } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
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
        email: user.email,
      };

      const token = jwt.sign(tokenPayload, secret, { expiresIn: '1h' });

      res.cookie('jwtToken', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
      });

      res.status(201).json({ message: 'Signup successful', user: tokenPayload });
    } catch (err) {
      console.error('Signup error:', err);
      res.status(500).json({ message: 'Signup failed' });
    }
  },

  // ----------------------------
  // GOOGLE LOGIN
  // ----------------------------
  googleLogin: async (req, res) => {
    const { credential } = req.body;

    try {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const { email, given_name, family_name } = payload;

      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({
          firstName: given_name,
          lastName: family_name || '',
          email,
          password: '', // No password for Google users
          birthDate: null,
        });
      }

      const tokenPayload = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      };

      const token = jwt.sign(tokenPayload, secret, { expiresIn: '1h' });

      res.cookie('jwtToken', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
      });

      res.json({ message: 'Google login successful', user: tokenPayload });
    } catch (err) {
      console.error('Google login error:', err);
      res.status(500).json({ message: 'Google login failed' });
    }
  },

  // ----------------------------
  // LOGOUT
  // ----------------------------
  logout: (req, res) => {
    res.clearCookie('jwtToken');
    res.json({ message: 'Logged out successfully' });
  },

  // ----------------------------
  // CHECK IF LOGGED IN
  // ----------------------------
  isUserLoggedIn: (req, res) => {
    const token = req.cookies.jwtToken;

    if (!token) {
      return res.status(401).json({ message: 'User not logged in' });
    }

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        res.json({ message: 'User is logged in', user });
      }
    });
  },
};

module.exports = authController;
