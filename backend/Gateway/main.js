const express = require('express');
const axios = require('axios');

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 4000;

function startServer() {
    app.listen(PORT, () => console.log(`Gateway listening on port ${PORT}`));
}

startServer();