async function insertUser(table, user) {
    await table.create({
        id: user.id,
        email: user.email,
        username: user.username,
        password: user.password,
    });
}

module.exports = {
    insertUser,
}
