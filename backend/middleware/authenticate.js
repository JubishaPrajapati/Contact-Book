const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '').trim();

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded); // Log decoded data

        if (!decoded.userId) {
            console.log("Decoded token missing userId");
            return res.status(401).json({ message: 'Invalid token payload' });
        }

        req.user = { userId: decoded.userId }; // Explicitly set expected structure
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}
module.exports = authenticate;