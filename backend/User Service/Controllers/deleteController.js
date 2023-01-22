const db = require("../Utils/db");
const encryption = require("../Utils/encryption");
require("dotenv").config();

/**
 * Controller for deleting user by email route
 */
async function deleteUserByEmail(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).send();
    }

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
    const userId = req.body.userId;
    const reqPassword = req.body.reqPassword;

    if (!userId || !reqPassword) {
        return res.status(400).send();
    }

    // confirm that user exists
    const user = await db.findUserById(db.User, userId);

    // user does not exist in database
    if (user === null) {
        return res.status(404).send();
    }

    // password is not correct
    if (!encryption.verifyPassword(user.password, reqPassword)) {
        return res.status(403).send();
    }

    // remove the user from the database
    try {
        await db.deleteUserById(db.User, userId);
        return res.send();
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}

module.exports = {
    deleteUserByEmail,
    deleteUserById,
}