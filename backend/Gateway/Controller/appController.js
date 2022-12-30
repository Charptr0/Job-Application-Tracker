const axios = require('axios');

/**
 *  Controller for adding a new application to the database
 */
async function addApplication(req, res, next) {
    // get all application attributes
    const collectionName = req.body.collectionName;
    const companyName = req.body.companyName;
    const jobTitle = req.body.jobTitle;
    const jobType = req.body.jobType;
    const location = req.body.location;
    const dateSubmitted = req.body.dateSubmitted;
    const salary = req.body.salary;
    const link = req.body.link;
    const status = req.body.status;
    const notes = req.body.notes;

    const userId = req.body.userId;

    // make sure all attributes are defined
    if (collectionName === undefined || companyName === undefined || jobTitle === undefined || jobType === undefined ||
        location === undefined || dateSubmitted === undefined || salary === undefined || link === undefined ||
        status === undefined || notes === undefined || userId === undefined) {
        return res.status(400).send();
    }

    // add to database
    try {
        await axios.post(process.env.APP_SERVICE_HOST + "/addApp", {
            collectionName, companyName, jobTitle, jobType,
            location, dateSubmitted, salary, link, status, notes, userId
        });

        return res.send();

    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

async function getAllUserApplications(req, res, next) {
    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).send();
    }

    try {
        const response = await axios.post(process.env.APP_SERVICE_HOST + "/getAllUserApps", { userId });
        return res.json({ applications: response.applications });

    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

module.exports = {
    addApplication,
    getAllUserApplications,
}