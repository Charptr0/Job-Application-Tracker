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

module.exports = {
    updateUserEmail,
}