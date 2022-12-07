const db = require("./Utils/db");

async function findUserById(req, res, next) {
    const user = await db.findUserById(db.User, '12345678');

    if (user == null) {
        return res.status(404);
    }

    return res.json({
        id: user.id,
        email: user.email,
        username: user.username,
    });
}

async function findUserByEmail(req, res, next) {
    const user = await db.findUserByEmail(db.User, `example@example.com`);

    if (user == null) {
        return res.status(404);
    }

    return res.json({
        id: user.id,
        email: user.email,
        username: user.username,
    });
}

async function insertUser(req, res, next) {

}

module.exports = {
    findUserById,
    findUserByEmail,
    insertUser,
}