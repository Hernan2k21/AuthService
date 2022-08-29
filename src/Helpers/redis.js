const redis = require('redis')
const config = require('../../config/app.config')
const redisConfig = config.redis
let redisClient = redis.createClient({
    url: `redis://:root@${redisConfig.host}:${redisConfig.port}`
}
);

redisClient.on("error", (error) => {
        throw new Error(error);
    });
    redisClient.on("connect", () => {
         console.log("Redis connected!");
    });

async function initRedis () {
    await redisClient.connect()
}
module.exports = {redisClient, initRedis}