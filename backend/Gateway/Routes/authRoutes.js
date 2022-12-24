const express = require('express');
const router = express.Router();
const controller = require("../Controller/authController");

router.post("/auth", controller.authenticateUser);

module.exports = router;
