const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.jwtToken;
        if (!token) {
            return res.status(401).json({
                error: "Unauthorized access",
            });
        }
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
};

module.exports = authMiddleware;