const { User } = require("../Utils/db/init");
const db = require("../Utils/db");
const encryption = require("../Utils/encryption");
require("dotenv").config();

async function updateUserEmail(req, res, next) {
    const id = req.body.userId;
    const newEmail = req.body.newEmail;
    const reqPassword = req.body.reqPassword;

    // find the user with the id
    const user = await db.findUserById(User, id);
    if (!user) return res.status(404).send();

    // make sure that the password matches
    if (!encryption.verifyPassword(user.password, reqPassword)) return res.status(401).send();

    // make sure that the new email dne in the db
    if (await db.userAlreadyExists(User, newEmail)) return res.status(409).send();

    // make change
    try {
        await db.updateUserEmail(id, newEmail);
        return res.send();
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

module.exports = {
    updateUserEmail,
}