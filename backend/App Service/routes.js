const express = require('express');
const router = express.Router();
const controller = require("./controller");

router.get('/', (req, res) => res.send());

router.post('/addApp', controller.addApplication);
router.post('/addCollection', controller.addCollection);
router.post('/getAllUserApps', controller.getAllUserApplications);
router.post('/getAllUserCollections', controller.getAllUserCollections);
router.post('/editApp', controller.editApplication);
router.post('/deleteApp', controller.deleteApplication);
router.post('/deleteCollection', controller.deleteCollection);
router.post('/deleteUser', controller.deleteUser);

module.exports = router;