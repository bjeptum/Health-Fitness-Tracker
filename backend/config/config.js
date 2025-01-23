// Config settings (environment variables)
require('dotenv').config();

const config = {
    // Application settings
    app: {
        port: process.env.PORT,
        env: process.env.NODE_ENV,
    },

    db: {
        uri: process.env.MONGO_URI 
    },

    // JWT settings
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    },

    frontend: {
        url: process.env.FRONTEND_URL,
    },

    api: {
        url: process.env.REACT_APP_API_URL,
    },
};

module.exports = config;
