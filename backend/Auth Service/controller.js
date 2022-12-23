require("dotenv").config();
const jwt = require("jsonwebtoken");

/**
 * Controller for authenticate user
 */
async function authenticateUser(req, res, next) {
    const accessToken = req.body.accessToken;
    const refreshToken = req.body.refreshToken;

    try {
        const decodedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);
        return res.send(`Good`);
    } catch (err) {
        return res.status(401).send();
    }
}

module.exports = {
    authenticateUser,
}