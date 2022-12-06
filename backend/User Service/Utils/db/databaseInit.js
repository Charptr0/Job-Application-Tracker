const { Sequelize, STRING } = require("sequelize");
require("dotenv").config();

// create a postgres db
const db = new Sequelize(process.env.POSTGRES_DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
});

/**
 * Create a user model
 */
async function createModel() {
    const User = db.define("User", {
        id: {
            type: STRING,
            primaryKey: true
        },
        email: {
            type: STRING,
            allowNull: false,
        },
        username: {
            type: STRING,
            allowNull: false,
        },
        password: {
            type: STRING,
            allowNull: false,
        },
    }, {
        tableName: "users",
    })

    await User.sync();
}

/**
 * Start the database
 */
async function init() {
    try {
        await db.authenticate(); // start the db
        await createModel(); // create the user table if not exist

    } catch (err) {
        throw err;
    }
}

module.exports = {
    init,
}
