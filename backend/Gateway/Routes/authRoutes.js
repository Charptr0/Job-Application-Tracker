const express = require('express');
const router = express.Router();
const controller = require("../Controller/authController");

router.post("/auth", controller.authenticateUser);

router.post("/logout", controller.logout);


module.exports = router;
