const bcrypt = require("bcryptjs");
const CryptoJS = require("crypto-js");
require("dotenv").config();

/**
 * Decrypt the password given by the user
 * @param {*} encryptedPassword the encrypted password  
 * @param {*} password the password passed by the user
 * @returns true if the password equal false otherwise
 */
function verifyPassword(encryptedPassword, password) {
    return bcrypt.compareSync(password, encryptedPassword);
}

function decryptJWT(encryptedToken) {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, process.env.ENCRYPTION_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
    verifyPassword,
    decryptJWT
}