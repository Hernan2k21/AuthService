
require('dotenv').config()

module.exports = {
    server:{
        port: process.env.PORT || 8080,
    },
    database:{
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: process.env.DB_DIALECT
    },
    jwtToken:{
        jwtSecretOrKey: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN

    },
    jwtRefreshToken:{
        jwtSecretOrKey: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN

    },
    redis: {
        username: process.env.REDIS_USERNAME,
        host:process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
  };
  