const axios = require("axios");

async function authenticateUser(req, res, next) {
    // get access token
    const authHeader = req.headers.authorization;
    console.log(req.cookies);

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
        console.log(`no refresh token provided`);
        return res.status(401).send();
    }

    try {
        await axios.post(process.env.AUTH_SERVICE_HOST + "/auth", { accessToken, refreshToken });
        return res.send();

    } catch (err) {
        return res.status(getHTTPStatus(err)).send();
    }
}

module.exports = {
    authenticateUser,
}