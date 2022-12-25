const axios = require("axios");

function getHTTPStatus(err) {
    if (!err.response?.status) {
        return 500;
    }

    return err.response.status;
}

/**
 * Controller to authenticate a user 
 */
async function authenticateUser(req, res, next) {
    // get access token
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).send();
    }

    const line = authHeader.split(" ");

    // no auth token provided
    if (line.length < 2 || line[0] !== 'Bearer') {
        return res.status(401).send();
    }

    const accessToken = line[1];

    // get current refresh token
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).send();
    }

    try {
        const result = await axios.post(process.env.AUTH_SERVICE_HOST + "/auth", { accessToken, refreshToken });
        return res.json(result.data);

    } catch (err) {
        console.error(err);
        return res.status(getHTTPStatus(err)).send();
    }
}

/**
 * Controller for logging out of a user 
 */
async function logout(req, res, next) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(400).send();
    }

    try {
        await axios.post(process.env.AUTH_SERVICE_HOST + "/logout", { refreshToken });
        return res.send();
    } catch (err) {
        return res.status(getHTTPStatus(err)).send();
    }
}

module.exports = {
    authenticateUser,
    logout,
}