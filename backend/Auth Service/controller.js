require("dotenv").config();
const jwt = require("jsonwebtoken");
const Redis = require("redis");


/**
 * Controller for authenticate user
 */
async function authenticateUser(req, res, next) {
    const accessToken = req.body.accessToken;
    const refreshToken = req.body.refreshToken;
    const userInfo = req.body.user;

    function validateUser(userInfo, tokenUserInfo) {
        if (userInfo.id === tokenUserInfo.id && userInfo.name === tokenUserInfo.name && userInfo.email === tokenUserInfo.email) {
            return true;
        }

        throw new Error("User information does not match with the token provided");
    }

    // verify access token and refresh token are still valid
    try {
        const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);

        // validate the access token and refresh token has the correct user information
        // validateUser(userInfo, decodedAccessToken);
        // validateUser(userInfo, decodedRefreshToken);
        return res.send();

    } catch (err) {
        console.log(err);
        return res.status(401).send();
    }

    // verify that the refresh token is still valid in the redis cache

}

module.exports = {
    authenticateUser,
}