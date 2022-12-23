const db = require("../Utils/db");
const encryption = require("../Utils/encryption");
const { v4 } = require("uuid");
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

    // create a jwt that expires in 1 day
    const token = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: "20s" });
    const encryptedToken = encryption.encryptJWT(token);

    // save token to database

    return res.send(encryptedToken);
}

/**
 * Controller for authenticate user
 */
async function authenticateUser(req, res, next) {
    const encryptedToken = req.body.encryptedToken;

    // decrypt the jwt token
    const token = encryption.decryptJWT(encryptedToken);

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return res.send(`Good`);
    } catch (err) {
        return res.status(401).send();
    }
}

module.exports = {
    authenticateUser,
    verifyLogin,
}