require("dotenv").config();
const jwt = require("jsonwebtoken");
const { insertRefreshTokenToCache, verifyTokenAndIdFromCache } = require("./db");

/**
 * Controller for authenticate user
 */
async function authenticateUser(req, res, next) {
    const accessToken = req.body.accessToken;
    const refreshToken = req.body.refreshToken;

    // verify access token
    jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decodedAccessToken) => {
        if (!err) return res.send();

        // access token invalid
        if (!err.message.includes("expire")) return res.send(403).send();

        // verify that the refresh token
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, async (err, decodedRefreshToken) => {
            // expired refresh token
            if (err) return res.status(403).send();

            // token not expired
            try {
                const reply = await verifyTokenAndIdFromCache(decodedRefreshToken.id, refreshToken);

                // id do not match
                if (!reply) return res.status(403).send();

                // all good
                return res.send();
            } catch (err) {
                console.error(err);
                return res.status(500).send();
            }
        });
    });

}

/**
 * Controller for adding refresh token to redis cache 
 */
async function addUserToCache(req, res, next) {
    const refreshToken = req.body.refreshToken;
    const id = req.body.id;

    // add refresh token to cache
    try {
        await insertRefreshTokenToCache(id, refreshToken);
        return res.send();

    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

module.exports = {
    authenticateUser,
    addUserToCache,
}