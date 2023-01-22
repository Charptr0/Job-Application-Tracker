const { User } = require("../db/init");

/**
 * Update a user email with their id
 * @param {string} id The id of the user
 * @param {string} newEmail the new email
 */
async function updateUserEmail(id, newEmail) {
    try {
        await User.update({ email: newEmail }, { where: { id: id } })
    } catch (err) {
        throw err;
    }
}

/**
 * Update a user username with their id
 * @param {string} id the id of the user
 * @param {string} newUsername the new username
 */
async function updateUserUsername(id, newUsername) {
    try {
        await User.update({ username: newUsername }, { where: { id: id } });
    } catch (err) {
        throw err;
    }
}

/**
 * 
 * @param {string} id the id of the user
 * @param {string} newPassword the new password 
 */
async function updateUserPassword(id, newPassword) {
    try {
        await User.update({ password: newPassword }, { where: { id: id } });
    } catch (err) {
        throw err;
    }
}

module.exports = {
    updateUserEmail,
    updateUserUsername,
    updateUserPassword,
}