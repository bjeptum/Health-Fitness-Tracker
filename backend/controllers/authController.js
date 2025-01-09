// Logic for handling API requests
// User authentication (register, login, getProfile)
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { userValidationSchema } = require('../utils/validators');

const generateToken = (userId) => {
    return jwt.sign( {id: userId }, process.env.JWT_SECRET, {expiresIn: '1h'});
};

exports.register = async (req, res) => {
    const { error } = userValidationSchema.validate(req.body, { abortEarly: false});
    if (error) {
        return res.status(400).json({message: 'Validation failed', details: error.details });
    }

    const { name, email, password } = req.body;

    try {
        const existsUser = await User.findOne({ email });
        if (existsUser) {
            return res.status(400).json({ message: 'User already exists'});
        }
        const newUser = await User.create({
            name,
            email,
            password,
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
            token: generateToken(newUser._id),
        });
    } catch (error) {
        console.error('Error during registration:', error)
        res.status(500).json({ message: 'Server error during registration' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' })
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json( { message:'Invalid email or password' });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Login error:', process.env.NODE_ENV.NODE_ENV === 'development' ? error : 'Error occurred');
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};