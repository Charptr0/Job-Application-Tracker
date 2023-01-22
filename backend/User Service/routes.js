const express = require('express');
const router = express.Router();
const authController = require("./Controllers/authController");
const deleteController = require("./Controllers/deleteController");
const fetchController = require("./Controllers/fetchController");
const insertController = require("./Controllers/insertController");
const updateController = require("./Controllers/updateController");

router.get('/', (req, res) => res.send());

// find a user in the database given its id
router.post("/findUserById", fetchController.findUserById);

// find a user in the database given its email
router.post("/findUserByEmail", fetchController.findUserByEmail);

// insert a user into the database
router.put("/insertUser", insertController.insertUser);

// verify the login info is correct
router.post("/login", authController.verifyLogin);

// delete a user from the database using its email
router.delete("/deleteUserByEmail", deleteController.deleteUserByEmail);

// delete a user from the database using its id
router.delete("/deleteUserById", deleteController.deleteUserById);

router.post("/updateUserEmail", updateController.updateUserEmail);

router.post("/updateUserUsername", updateController.updateUserUsername);

module.exports = router;