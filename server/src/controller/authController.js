const express = require('express');
const jwt = require('jsonwebtoken');
const secret = "e969c6cf-42a7-4f98-82e1-f195518edfb7";

const authController = {
    login: (request, response) => {
        const { username, password } = request.body;

        if (username === "admin" && password === "admin") {
            const user = {
                name: 'John Cena',
                email: 'john@cena'
            };

            const token = jwt.sign(user, secret, { expiresIn: '1h' });

            response.cookie('jwtToken', token, {
                httpOnly: true,
                secure: true,
                domain: 'localhost',
                path: '/'
            });

            response.json({ message: "Login successful", token });
        } else {
            response.status(401).json({ message: "Invalid credentials" });
        }
    },

    logout: (request, response) => {
        response.clearCookie('jwtToken');
        response.json({ message: "Logged out successfully" });
    },

    isUserLoggedIn: (request, response) => {
        const token = request.cookies.jwtToken;

        if (!token) {
            return response.status(401).json({ message: "User not logged in" });
        }

        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return response.status(401).json({ message: "Invalid token" });
            } else {
                response.json({ message: "User is logged in", user });
            }
        });
    },
};

module.exports = authController;
