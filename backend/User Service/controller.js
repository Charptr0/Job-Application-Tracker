const db = require("./Utils/db");
const encryption = require("./Utils/encryption");
const { v4 } = require("uuid");

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
        return res.status(403).send();
    }

    // check password
    if (encryption.verifyPassword(user.password, password)) {
        return res.send();
    }

    return res.status(403).json();
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

module.exports = {
    findUserById,
    findUserByEmail,
    insertUser,
    verifyLogin,
    deleteUserByEmail,
    deleteUserById,
}