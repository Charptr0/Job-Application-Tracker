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
router.post("/deleteUserByEmail", deleteController.deleteUserByEmail);

// delete a user from the database using its id
router.post("/deleteUserById", deleteController.deleteUserById);

// update a user's email 
router.post("/updateUserEmail", updateController.updateUserEmail);

// update a user's username
router.post("/updateUserUsername", updateController.updateUserUsername);

// update a user's password
router.post("/updateUserPassword", updateController.updateUserPassword);

module.exports = router;