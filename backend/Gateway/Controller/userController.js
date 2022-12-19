const axios = require("axios");
require("dotenv").config();

/**
 * Retrieve the status of the user service
 * 
 * 200 - The user service operational
 * 
 * 500 - The user service is down
 */
async function getStatus(req, res, next) {
    try {
        await axios.get(process.env.USER_SERVICE_HOST);
        res.send();

    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

async function findUserById(req, res, next) {
    try {
        // make request
        const result = await axios.post(process.env.USER_SERVICE_HOST + "/findUserById", req.body);

        // send back the result
        res.send(result.data);

    } catch (err) {
        const status = err.response?.status;

        if (status) {
            return res.status(status).send();
        }

        return res.status(500).send();
    }
}

async function findUserByEmail(req, res, next) {
    try {
        // make request
        const result = await axios.post(process.env.USER_SERVICE_HOST + "/findUserByEmail", req.body);

        // send back the result
        res.send(result.data);

    } catch (err) {
        const status = err.response?.status;

        if (status) {
            return res.status(status).send();
        }

        return res.status(500).send();
    }
}

module.exports = {
    getStatus,
    findUserById,
    findUserByEmail
}