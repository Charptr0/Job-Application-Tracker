const express = require('express');
const router = express.Router();
const controller = require("./controller");

router.get('/', (req, res) => res.send());

router.post('/addApp', controller.addApplication);
router.post('/getAllUserApps', controller.getAllUserApplications);
router.post('/editApp', controller.editApplication);
router.post('/deleteApp', controller.deleteApplication);

module.exports = router;