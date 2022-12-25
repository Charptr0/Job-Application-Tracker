const db = require("../Utils/db");
const encryption = require("../Utils/encryption");
require("dotenv").config();
const jwt = require("jsonwebtoken");

/**
 * Controller for login route
 */
async function verifyLogin(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).send();
    }

    // fetch user in database
    const user = await db.findUserByEmail(db.User, email);

    // user not found
    if (user === null) {
        return res.status(400).send();
    }

    // check password
    if (!encryption.verifyPassword(user.password, password)) {
        return res.status(400).send();;
    }

    const userInfo = {
        id: user.id,
        email: user.email,
        username: user.username
    }

    // create access and refresh token
    // access token last for 5 min
    const accessToken = jwt.sign(userInfo, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: "5m" });

    // refresh token last for 12 hr
    const refreshToken = jwt.sign(userInfo, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: "12h" });

    // send back to gateway
    return res.json({
        accessToken,
        refreshToken,
        id: userInfo.id,
        email: userInfo.email,
        username: userInfo.username
    });
}

module.exports = {
    verifyLogin,
}