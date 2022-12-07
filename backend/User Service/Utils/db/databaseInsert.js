async function insertUser(table, user) {
    try {
        await table.create({
            id: user.id,
            email: user.email,
            username: user.username,
            password: user.password,
        });

    } catch (err) {
        throw err;
    }
}

module.exports = {
    insertUser,
}
