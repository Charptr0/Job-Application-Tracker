const { redisClient } = require("./init");

/**
 * Delete a refresh token from the cache
 * @param {string} refreshToken the refresh token of the user
 * @returns reply of the redis cache
 * @throws {Error} error of the redis cache
 */
async function deleteRefreshTokenFromCache(refreshToken) {
    try {
        const reply = await redisClient.del(refreshToken);
        return reply;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    deleteRefreshTokenFromCache,
}