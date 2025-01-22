// Config settings (environment variables)
require('dotenv').config();

const config = {
    // Application settings
    app: {
        port: process.env.PORT || 8000,
        env: process.env.NODE_ENV || 'development',
    },

    db: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/fitness-tracker',
    },

    // JWT settings
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },

    frontend: {
        url: process.env.FRONTEND_URL || 'http://localhost:3000',
    },

    api: {
        url: process.env.BACKEND_URL || 'http://localhost:8000',
    },
};

module.exports = config;
