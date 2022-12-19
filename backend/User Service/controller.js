const db = require("./Utils/db");
const encryption = require("./Utils/encryption");
const { v4 } = require("uuid");
require("dotenv").config();
const jwt = require("jsonwebtoken");

/**
 * Controller for findUserById route
 */
async function findUserById(req, res, next) {
    const user = await db.findUserById(db.User, req.body.id); // find the user

    // user not found
    if (user === null) {
        return res.status(404).send();
    }

    // send the user info back to the frontend
    return res.json({
        id: user.id,
        email: user.email,
        username: user.username,
    });
}

/**
 * Controller for findUserByEmail route
 */
async function findUserByEmail(req, res, next) {
    const user = await db.findUserByEmail(db.User, req.body.email); // find user by email

    if (user === null) {
        return res.status(404).send();
    }

    return res.json({
        id: user.id,
        email: user.email,
        username: user.username,
    });
}

/**
 * Controller for insertUser route 
 */
async function insertUser(req, res, next) {
    const username = req.body.username; // get username
    const email = req.body.email; // get email
    const password = req.body.password; // get password
    const id = v4().slice(0, 8); // generate random 8 digit id
    const encryptedPassword = encryption.encryptPassword(password); // encrypt the password

    const user = {
        id,
        username,
        email,
        password: encryptedPassword
    }

    // check if email already exists
    if (await db.findUserByEmail(db.User, email) !== null) {
        return res.status(400).send();
    }

    // insert into database
    try {
        await db.insertUser(db.User, user);
        res.send();

    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

/**
 * Controller for login route
 */
async function verifyLogin(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

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

    return res.send(encryptedToken);
}

/**
 * Controller for login with google route
 */
async function verifyLoginWithGoogle(req, res, next) {
    const token = req.body.credential;

    const encryptedToken = encryption.encryptJWT(token);

    return res.send(encryptedToken);
}

async function authenticateUser(req, res, next) {
    const authHeader = req.headers.authorization;

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

/**
 * Controller for deleting user by email route
 */
async function deleteUserByEmail(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    // confirm that user exists
    const user = await db.findUserByEmail(db.User, email);

    // user does not exist in database
    if (user === null) {
        return res.status(404).send();
    }

    // password is not correct
    if (!encryption.verifyPassword(user.password, password)) {
        return res.status(404).send();
    }

    // remove the user from the database
    try {
        await db.deleteUserByEmail(db.User, email);
        return res.send();
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}

/**
 * Controller for deleting user by id route
 */
async function deleteUserById(req, res, next) {
    const id = req.body.id;
    const password = req.body.password;

    // confirm that user exists
    const user = await db.findUserById(db.User, id);

    // user does not exist in database
    if (user === null) {
        return res.status(404).send();
    }

    // password is not correct
    if (!encryption.verifyPassword(user.password, password)) {
        return res.status(404).send();
    }

    // remove the user from the database
    try {
        await db.deleteUserById(db.User, id);
        return res.send();
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}

/**
 * Controller for checking if a email exists in the database
 */
async function checkEmailExist(req, res, next) {
    if (await db.checkEmail(db.User, req.body.email)) {
        return res.json({
            result: "Email already exists"
        });
    }

    return res.json({
        result: 'Email does not exist'
    })
}

module.exports = {
    findUserById,
    findUserByEmail,
    insertUser,
    verifyLogin,
    deleteUserByEmail,
    deleteUserById,
    checkEmailExist,
    authenticateUser,
    verifyLoginWithGoogle,
}