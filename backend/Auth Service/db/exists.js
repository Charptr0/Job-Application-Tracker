const { redisClient } = require("./init");

/**
 * Check if the user id exists in the cache 
 * @param {string} id the user id
 * @returns the reply of the query
 * @throw redis cache error
 */
async function idExistInCache(id) {
    try {
        // check if the id exists in cache
        const reply = await redisClient.exists(id);
        return reply;
    } catch (err) {
        throw err;
    }
}

/**
 * Check if the refresh token exists in the cache associated with the certain user id 
 * @param {string} id the user id
 * @param {string} refreshToken the refresh token 
 * @returns the reply of the query
 * @throw redis cache error
 */
async function refreshTokenExistInCache(id, refreshToken) {
    try {
        // check if the refresh token is associated with the user id
        const reply = await redisClient.sIsMember(id, refreshToken);
        return reply;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    idExistInCache,
    refreshTokenExistInCache
}