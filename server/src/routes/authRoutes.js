// src/routes/authRoutes.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controller/authController');

// -----------------------------
// Traditional Auth Routes
// -----------------------------

// POST /auth/login
router.post(
  '/login',
  [
    body('email', 'Email is required and must be valid').isEmail(),
    body('password', 'Password is required').notEmpty(),
  ],
  authController.login
);

// POST /auth/signup
router.post(
  '/signup',
  [
    body('firstName', 'First name is required').notEmpty(),
    body('lastName', 'Last name is required').notEmpty(),
    body('email', 'Valid email is required').isEmail(),
    body('password', 'Password is required and must be at least 6 characters').isLength({ min: 6 }),
  ],
  authController.signup
);

// POST /auth/logout
router.post('/logout', authController.logout);

// GET /auth/is-user-logged-in
router.get('/is-user-logged-in', authController.isUserLoggedIn);

// -----------------------------
// Google OAuth Login Route
// -----------------------------

// POST /auth/google-login
router.post('/google-login', authController.googleLogin);

module.exports = router;
