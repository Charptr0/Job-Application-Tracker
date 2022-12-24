const axios = require("axios");

function getHTTPStatus(err) {
    if (!err.response?.status) {
        return 500;
    }

    return err.response.status;
}

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

    // get user info
    const user = {};

    try {
        await axios.post(process.env.AUTH_SERVICE_HOST + "/auth", { accessToken, refreshToken, user });
        return res.send();

    } catch (err) {
        return res.status(getHTTPStatus(err)).send();
    }
}

module.exports = {
    authenticateUser,
}