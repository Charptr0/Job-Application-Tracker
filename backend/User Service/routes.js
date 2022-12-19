const express = require('express');
const router = express.Router();
const controller = require("./controller");

router.get('/', (req, res) => res.send());

// find a user in the database given its id
router.post("/findUserById", controller.findUserById);

// find a user in the database given its email
router.post("/findUserByEmail", controller.findUserByEmail);

// insert a user into the database
router.put("/insertUser", controller.insertUser);

// verify the login info is correct
router.post("/login", controller.verifyLogin);

// verify the login with google
router.post("/loginOauth", controller.verifyLoginWithGoogle);

// authenticate the user
router.post("/auth", controller.authenticateUser);

// delete a user from the database using its email
router.delete("/deleteUserByEmail", controller.deleteUserByEmail);

// delete a user from the database using its id
router.delete("/deleteUserByEmail", controller.deleteUserById);

// check if a email is in the database
router.post("/checkEmail", controller.checkEmailExist);

module.exports = router;