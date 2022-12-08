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

// verify the login info is correct
router.post("/login", controller.verifyLogin);

// delete a user from the database using its email
router.delete("/deleteUserByEmail", controller.deleteUserByEmail);

// delete a user from the database using its id
router.delete("/deleteUserByEmail", controller.deleteUserById);

module.exports = router;