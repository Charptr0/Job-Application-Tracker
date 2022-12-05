const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 4001;

app.get("/", (req, res) => {
    res.send(`Hello world`)
});

app.listen(PORT, () => console.log(`User Service listening on port ${PORT}`));