// Config settings (environment variables)
require('dotenv').config();

const config = {
    // Application settings
    app: {
        port: process.env.PORT || 8000,
        env: process.env.NODE_ENV || 'development',
    },

    // JWT settings
    jwt: {
        secret: process.env.JWT_SECRET || 'your_jwt_secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },

    // API settings
    api: {
        baseURL: process.env.API_BASE_URL || 'http://localhost:8000/api',
    }
};

module.exports = config;