// Logic for handling API requests
// User authentication (register, login)
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const generateToken = (userId) => {
    return jwt.sign( {id: userId }, process.env.JWT_SECRET, {expiresIn: '1h'});
};

exports,login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.satus(401).json( { message:'Invalid email or password' });
        }

        res.json({
            _id: user.__id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};