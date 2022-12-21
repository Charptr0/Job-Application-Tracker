const db = require("../Utils/db");
require("dotenv").config();

/**
 * Controller for findUserById route
 */
async function findUserById(req, res, next) {
    if (req.body?.id === undefined) {
        return res.status(400).send();
    }

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
    if (req.body?.email === undefined) {
        return res.status(400).send();
    }

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

module.exports = {
    findUserByEmail,
    findUserById,
}