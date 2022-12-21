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
 * Controller for login with google route
 */
async function verifyLoginWithGoogle(req, res, next) {
    const token = req.body.credential;

    if (!token) {
        return res.status(400).send();
    }

    const encryptedToken = encryption.encryptJWT(token);

    return res.send(encryptedToken);
}

/**
 * Controller for authenticate user w/o google Oauth 
 */
async function authenticateUser(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).send();
    }

    const line = authHeader.split(" ");

    // no auth token provided
    if (line.length < 2 || line[0] !== 'Bearer') {
        return res.status(401).send();
    }

    const encryptedToken = line[1];

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
    verifyLoginWithGoogle,
}