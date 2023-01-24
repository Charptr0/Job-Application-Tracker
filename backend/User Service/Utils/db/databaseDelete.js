async function deleteUserByEmail(table, email) {
    try {
        await table.destroy({
            where: { email: email },
        });

    } catch (err) {
        throw err;
    }
}

async function deleteUserById(table, id) {
    try {
        await table.destroy({
            where: { id: id },
        });

    } catch (err) {
        throw err;
    }
}

module.exports = {
    deleteUserByEmail,
    deleteUserById,
}