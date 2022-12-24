const { redisClient } = require("./init");

/**
 * Add a new user to the cache
 * @param {string} id the user id
 * @param {string} refreshToken the refresh token 
 * @returns reply of the redis cache
 * @throws {Error} error of the redis cache
 */
async function insertRefreshTokenToCache(id, refreshToken) {
    try {
        const reply = await redisClient.sAdd(id, refreshToken)
        return reply;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    insertRefreshTokenToCache,
}