const bcrypt = require('bcryptjs');
const saltVal = 10;

function encryptPassword(password) {
    const salt = bcrypt.genSaltSync(saltVal);
    return bcrypt.hashSync(password, salt);
}

module.exports = {
    encryptPassword,
}