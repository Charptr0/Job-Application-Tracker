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

/**
 * Delete all tokens associated with this user id
 * @param {string} id the user id 
 */
async function deleteAllRefreshTokens(id) {
    try {
        // get all keys
        const keys = await redisClient.keys("*");

        // delete all keys associated with the id
        for (let i = 0; i < keys.length; i++) {
            const refreshToken = keys[i];
            const userId = await redisClient.get(refreshToken);
            if (userId === id) await deleteRefreshTokenFromCache(refreshToken);
        }

    } catch (err) {
        throw err;
    }
}

module.exports = {
    deleteRefreshTokenFromCache,
    deleteAllRefreshTokens,
}