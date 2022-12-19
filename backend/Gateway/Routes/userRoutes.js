const express = require('express');
const router = express.Router();
const controller = require("../Controller/userController");

// get status of the user service
router.get('/', controller.getStatus);

// find a user by id
router.post("/findUserById", controller.findUserById);

// find a user by email
router.post("/findUserByEmail", controller.findUserByEmail);


module.exports = router;