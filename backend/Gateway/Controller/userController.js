const axios = require("axios");
require("dotenv").config();

function getHTTPStatus(err) {
    if (!err.response?.status) {
        return 500;
    }

    return err.response.status;
}

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
        return res.send();

    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}

/**
 * Controller for find a user in the database given ID
 */
async function findUserById(req, res, next) {
    if (req.body === undefined) {
        return res.status(400).send();
    }

    try {
        // make request
        const result = await axios.post(process.env.USER_SERVICE_HOST + "/findUserById", req.body);

        // send back the result
        return res.send(result.data);

    } catch (err) {
        // send back the err status code
        return res.status(getHTTPStatus(err)).send();
    }
}

/**
 * Controller for find a user in the database given email
 */
async function findUserByEmail(req, res, next) {
    if (req.body === undefined) {
        return res.status(400).send();
    }

    try {
        // make request
        const result = await axios.post(process.env.USER_SERVICE_HOST + "/findUserByEmail", req.body);

        // send back the result
        return res.send(result.data);

    } catch (err) {
        return res.status(getHTTPStatus(err)).send();
    }
}

/**
 * Controller for inserting a user into the database
 */
async function insertUser(req, res, next) {
    if (req.body === undefined) {
        return res.status(400).send();
    }

    try {
        await axios.put(process.env.USER_SERVICE_HOST + "/insertUser", req.body);
        return res.send();

    } catch (err) {
        return res.status(getHTTPStatus(err)).send();
    }

}

/**
 * Controller for logging user in
 */
async function verifyLogin(req, res, next) {
    if (req.body === undefined) {
        return res.status(400).send();
    }

    try {
        const resultFromUserService = await axios.post(process.env.USER_SERVICE_HOST + "/login", req.body);

        const refreshToken = resultFromUserService.data.refreshToken;
        const id = resultFromUserService.data.id;

        // add to redis cache
        await axios.post(process.env.AUTH_SERVICE_HOST + "/addUserToCache", { refreshToken, id });

        // send back the refresh token as httpOnly cookie
        res.cookie("refreshToken", refreshToken, { httpOnly: true });

        return res.json({
            accessToken: resultFromUserService.data.accessToken,
            id: id,
            email: resultFromUserService.data.email,
            username: resultFromUserService.data.username,
        });

    } catch (err) {
        console.error(err);
        return res.status(getHTTPStatus(err)).send(err);
    }

}

/**
 * Controller for deleting a user in the database given email
 */
async function deleteUserByEmail(req, res, next) {
    if (req.body === undefined) {
        return res.status(400).send();
    }

    try {
        await axios.delete(process.env.USER_SERVICE_HOST + "/deleteUserByEmail", req.body);
        return res.send();

    } catch (err) {
        return res.status(getHTTPStatus(err)).send();
    }

}

/**
 * Controller for  deleting a user in the database given ID
 */
async function deleteUserById(req, res, next) {
    if (req.body === undefined) {
        return res.status(400).send();
    }

    try {
        await axios.delete(process.env.USER_SERVICE_HOST + "/deleteUserById", req.body);
        return res.send();

    } catch (err) {
        return res.status(getHTTPStatus(err)).send();
    }
}

/**
 * Controller for checking if a email exist
 */
async function checkEmailExist(req, res, next) {
    if (req.body === undefined) {
        return res.status(400).send();
    }

    try {
        await axios.post(process.env.USER_SERVICE_HOST + "/checkEmail", req.body);
        return res.send();

    } catch (err) {
        return res.status(getHTTPStatus(err)).send();
    }
}

async function updateUserEmail(req, res, next) {
    const userId = req.body.id;
    const newEmail = req.body.email;
    const reqPassword = req.body.password;

    if (!userId || !newEmail || !reqPassword) return res.status(400).send();

    try {
        // call user service
        await axios.post(process.env.USER_SERVICE_HOST + "/updateUserEmail", { userId, newEmail, reqPassword });

        // clear all tokens associated with this account
        await axios.post(process.env.AUTH_SERVICE_HOST + "/removeTokenById", { userId });

        return res.send();
    } catch (err) {
        return res.status(getHTTPStatus(err)).send();
    }
}

async function updateUserUsername(req, res, next) {
    const userId = req.body.id;
    const newUsername = req.body.username;
    const reqPassword = req.body.password;

    if (!userId || !newUsername || !reqPassword) return res.status(400).send();

    try {
        await axios.post(process.env.USER_SERVICE_HOST + "/updateUserUsername", { userId, newUsername, reqPassword });

        await axios.post(process.env.AUTH_SERVICE_HOST + "/removeTokenById", { userId });

        return res.send();
    } catch (err) {
        return res.status(getHTTPStatus(err)).send();
    }
}

async function updateUserPassword(req, res, next) {
    const userId = req.body.id;
    const newPassword = req.body.newPassword;
    const reqPassword = req.body.reqPassword;;

    if (!userId || !newPassword || !reqPassword) return res.status(400).send();

    try {
        await axios.post(process.env.USER_SERVICE_HOST + "/updateUserPassword", { userId, newPassword, reqPassword });

        await axios.post(process.env.AUTH_SERVICE_HOST + "/removeTokenById", { userId });

        return res.send();
    } catch (err) {
        console.error(err);
        return res.status(getHTTPStatus(err)).send();
    }

}

module.exports = {
    getStatus,
    findUserById,
    findUserByEmail,
    insertUser,
    verifyLogin,
    deleteUserByEmail,
    deleteUserById,
    checkEmailExist,
    updateUserEmail,
    updateUserUsername,
    updateUserPassword,
}