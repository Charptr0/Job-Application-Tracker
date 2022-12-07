const express = require('express');
const router = express.Router();
const controller = require("./controller");

router.get('/', (req, res) => res.send());

// find a user in the database given its id
router.post("/findUserById", controller.findUserById);

// find a user in the database given its email
router.post("/findUserByEmail", controller.findUserByEmail);

// insert a user into the database
router.post("/insertUser", controller.insertUser);

module.exports = router;