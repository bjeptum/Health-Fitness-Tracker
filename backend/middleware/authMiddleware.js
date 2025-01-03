// Middlewares (JWT authentication. etc)
// Protect routes with  JWT
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: 'No token provided'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.staus(401).json({ message: 'User not found'});
        }
        next();
    } catch (error) {
        res.status(401).json({message: 'Invalid token'});
    }
};

module.exports = { protect };
