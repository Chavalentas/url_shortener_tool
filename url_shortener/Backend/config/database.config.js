require('dotenv').config();
const config= {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    urlHashName: "url_keys"
}

module.exports = config;