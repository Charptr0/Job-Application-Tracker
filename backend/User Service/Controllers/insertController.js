const db = require("../Utils/db");
const encryption = require("../Utils/encryption");
const { v4 } = require("uuid");
require("dotenv").config();

/**
 * Controller for insertUser route 
 */
async function insertUser(req, res, next) {
    const username = req.body.username; // get username
    const email = req.body.email; // get email
    const password = req.body.password; // get password
    const id = v4().slice(0, 8); // generate random 8 digit id
    const encryptedPassword = encryption.encryptPassword(password); // encrypt the password

    if (!username || !email || !password) {
        return res.status(400).send();
    }

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
        await db.insertRegularUser(user);
        res.send();

    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

module.exports = {
    insertUser,
}