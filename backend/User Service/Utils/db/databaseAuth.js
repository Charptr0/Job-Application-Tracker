const { Sequelize } = require("sequelize");

require("dotenv").config();

const db = new Sequelize(process.env.POSTGRES_DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
});

/**
 * Start the database
 */
async function authenticate() {
    try {
        await db.authenticate();
    } catch (err) {
        console.log(`Error authenticating the server`);
        throw err;
    }
}

module.exports = {
    authenticate,
}
