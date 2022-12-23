const express = require('express');
const router = express.Router();
const controller = require("../Controller/authController");

router.post("/auth", (req, res) => {
    console.log(req.cookies);
    res.send();
});

module.exports = router;
