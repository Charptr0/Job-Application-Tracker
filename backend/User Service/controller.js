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

module.exports = {
    findUserById,
    findUserByEmail,
    insertUser,
}