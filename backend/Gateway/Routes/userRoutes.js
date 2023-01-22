const express = require('express');
const router = express.Router();
const controller = require("../Controller/userController");

// get status of the user service
router.get('/', controller.getStatus);

// find a user by id
router.post("/findUserById", controller.findUserById);

// find a user by email
router.post("/findUserByEmail", controller.findUserByEmail);

// insert a user into the database
router.put("/insertUser", controller.insertUser);

// verify the login info is correct
router.post("/login", controller.verifyLogin);

// delete a user from the database using its email
router.delete("/deleteUserByEmail", controller.deleteUserByEmail);

// delete a user from the database using its id
router.delete("/deleteUserById", controller.deleteUserById);

// check if a email is in the database
router.post("/checkEmail", controller.checkEmailExist);

// change the user's email
router.post("/updateUserEmail", controller.updateUserEmail);

// change the user's username
router.post("/updateUserUsername", controller.updateUserUsername);

// change the user's password
router.post("/updateUserPassword", controller.updateUserEmail);

module.exports = router;