// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/is-user-logged-in', authController.isUserLoggedIn);
router.post('/signup', authController.signup); // ✅ New route

module.exports = router;
