const { redisClient } = require("./init");

/**
 * Check if the refresh token exists in the cache associated with the certain user id 
 * @param {string} id the user id
 * @param {string} refreshToken the refresh token 
 * @returns {boolean} the reply of the query
 * @throw redis cache error
 */
async function verifyTokenAndIdFromCache(id, refreshToken) {
    try {
        // check if the refresh token is associated with the user id
        const reply = await redisClient.get(refreshToken);

        return id === reply;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    verifyTokenAndIdFromCache
}