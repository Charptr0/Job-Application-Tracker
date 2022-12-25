require("dotenv").config();
const jwt = require("jsonwebtoken");
const { insertRefreshTokenToCache, verifyTokenAndIdFromCache, deleteRefreshTokenFromCache } = require("./db");

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
        if (!err.message.includes("expire")) return res.send(500).send();

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
                const user = {
                    id: decodedRefreshToken.id,
                    email: decodedRefreshToken.email,
                    username: decodedRefreshToken.username
                }

                // create a new access token
                const newAccessToken = jwt.sign(user, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: "10s" });

                // send it back to the frontend
                return res.send(newAccessToken);

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

async function logout(req, res, next) {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return res.status(400).send();
    }

    // remove refresh token from cache
    try {
        await deleteRefreshTokenFromCache(refreshToken);

        // remove refresh token cookie
        res.clearCookie("refreshToken");
        return res.send();

    } catch (err) {
        return res.status(500).send();
    }
}

module.exports = {
    authenticateUser,
    addUserToCache,
    logout,
}