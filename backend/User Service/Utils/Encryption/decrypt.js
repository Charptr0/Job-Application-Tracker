const bcrypt = require("bcryptjs");

/**
 * Decrypt the password given by the user
 * @param {*} encryptedPassword the encrypted password  
 * @param {*} password the password passed by the user
 * @returns true if the password equal false otherwise
 */
function verifyPassword(encryptedPassword, password) {
    return bcrypt.compareSync(password, encryptedPassword);
}

module.exports = {
    verifyPassword,
}