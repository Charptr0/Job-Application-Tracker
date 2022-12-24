const { redisClient } = require("./init");

/**
 * Delete a refresh token from the cache
 * @param {string} id the user id
 * @param {string} refreshToken the refresh token of the user
 * @returns reply of the redis cache
 * @throws {Error} error of the redis cache
 */
async function deleteRefreshTokenFromCache(id, refreshToken) {
    try {
        const reply = await redisClient.sRem(id, refreshToken);
        return reply
    } catch (err) {
        throw err;
    }
}

/**
 * Remove all refresh tokens from a user in the cache
 * @param {string} id The user id
 * @returns reply of the redis cache
 * @throws {Error} error of the redis cache
 */
async function deleteUserFromCache(id) {
    try {
        const reply = await redisClient.del(id);
        return reply;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    deleteRefreshTokenFromCache,
    deleteUserFromCache,
}