require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_ENDPOINT,
  credentials: true,
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRoutes);

const PORT = 5001;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
