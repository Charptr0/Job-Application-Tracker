/**
 * Find a user in the database by id
 * @param {*} table the database table to query 
 * @param {*} id the id of the user
 * @returns the user attributes or null if not found
 */
async function findUserById(table, id) {
    const user = await table.findOne({
        where: { id: id },
    });

    return user;
}

/**
 * Find a user in the database by email
 * @param {*} table the database table to query 
 * @param {*} email the email of the user
 * @returns the user attributes or null if not found
 */
async function findUserByEmail(table, email) {
    const user = await table.findOne({
        where: { email: email },
    });

    return user;
}

/**
 * Checks if a user exist in the database
 * @param {*} table the database table to query 
 * @param {*} email the email of the user
 * @returns true if the user already exist
 */
async function userAlreadyExists(table, email) {
    const user = await findUserByEmail(table, email);

    return user !== null;
}

module.exports = {
    findUserById,
    findUserByEmail,
    userAlreadyExists,
}