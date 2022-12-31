const express = require('express');
const router = express.Router();
const controller = require("../Controller/appController");

router.post('/addApp', controller.addApplication);
router.post('/getAllUserApps', controller.getAllUserApplications);
router.post('/editApp', controller.editApplication);
router.post('/deleteApp', controller.deleteApplication);

module.exports = router;