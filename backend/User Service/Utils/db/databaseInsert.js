const { User, Auth } = require("../db/init");

async function insertRegularUser(userInfo) {
    try {
        await User.create({
            id: userInfo.id,
            email: userInfo.email,
            username: userInfo.username,
            password: userInfo.password,
        });

    } catch (err) {
        throw err;
    }
}

async function insertToken(userId, token) {
    try {
        await Auth.create({
            userId: userId,
            token: token,
        });

    } catch (err) {
        throw err;
    }
}

module.exports = {
    insertRegularUser,
    insertToken
}
