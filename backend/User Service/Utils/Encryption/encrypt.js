const bcrypt = require('bcryptjs');
const cryptoJS = require("crypto-js");
require("dotenv").config();

const saltVal = 10;

function encryptPassword(password) {
    const salt = bcrypt.genSaltSync(saltVal);
    return bcrypt.hashSync(password, salt);
}

function encryptJWT(token) {
    return cryptoJS.AES.encrypt(token, process.env.ENCRYPTION_SECRET).toString();
}

module.exports = {
    encryptPassword,
    encryptJWT,
}