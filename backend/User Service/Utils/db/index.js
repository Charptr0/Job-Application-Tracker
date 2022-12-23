const { Auth, OAuthUser, User, init } = require("./init");
const { findUserById, findUserByEmail, userAlreadyExists } = require("./databaseFetch");
const { insertRegularUser, insertToken } = require("./databaseInsert");
const { deleteUserByEmail, deleteUserById } = require("./databaseDelete");

module.exports = {
    init,
    User,
    OAuthUser,
    Auth,
    findUserById,
    findUserByEmail,
    insertRegularUser,
    insertToken,
    deleteUserByEmail,
    deleteUserById,
    userAlreadyExists,
}
