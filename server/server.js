const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = 5001;

app.listen(PORT, (error) => {
    if (error) {
        console.error('Error starting server:', error);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});
