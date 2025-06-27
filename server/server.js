const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const linksRoutes = require('./src/routes/linksRoutes');

// Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS config to allow frontend origin and credentials (cookies)
app.use(
  cors({
    origin: process.env.CLIENT_ENDPOINT,
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/auth', authRoutes);
app.use('/links', linksRoutes);

// Server listen
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
