const { Auth, OAuthUser, User, init } = require("./init");
const { findUserById, findUserByEmail, userAlreadyExists } = require("./databaseFetch");
const { insertRegularUser, insertToken } = require("./databaseInsert");
const { deleteUserByEmail, deleteUserById } = require("./databaseDelete");
const { updateUserEmail, updateUserUsername } = require("./databaseUpdate");


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
    updateUserEmail,
    updateUserUsername
}
