const express = require('express');
const router = express.Router();
const controller = require("./controller");

router.get('/', (req, res) => res.send());

router.post('/auth', controller.authenticateUser);

router.post('/addUserToCache', controller.addUserToCache);

router.post('/logout', controller.logout);

module.exports = router;