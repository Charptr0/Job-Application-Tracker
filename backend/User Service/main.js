const express = require("express");
const db = require("./Utils/db");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 4001;

app.get("/", (req, res) => {
    res.send(`Hello world`)
});


db.init().then((err) => {
    if (err) {
        console.log(err);
        return;
    };

    app.listen(PORT, () => console.log(`User Service listening on port ${PORT}`));
})