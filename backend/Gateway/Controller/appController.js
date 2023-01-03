const axios = require('axios');

/**
 *  Controller for adding a new application to the database
 */
async function addApplication(req, res, next) {
    // get all application attributes
    const collectionName = req.body?.collectionName;
    const companyName = req.body?.application?.companyName;
    const jobTitle = req.body?.application?.jobTitle;
    const jobType = req.body?.application?.jobType;
    const location = req.body?.application?.location;
    const dateSubmitted = req.body?.application?.dateSubmitted;
    const salary = req.body?.application?.salary;
    const link = req.body?.application?.link;
    const status = req.body?.application?.status;
    const notes = req.body?.application?.notes;

    const userId = req.body?.userId;

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

/**
 * Controller for getting all application in the db from a certain user 
 */
async function getAllUserApplications(req, res, next) {
    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).send();
    }

    try {
        const response = await axios.post(process.env.APP_SERVICE_HOST + "/getAllUserApps", { userId });

        return res.json({ applications: response.data.applications });

    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

async function getAllUserCollections(req, res, next) {
    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).send();
    }

    try {
        const response = await axios.post(process.env.APP_SERVICE_HOST + "/getAllUserCollections", { userId });

        return res.json({ collections: response.data.collections });

    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

async function editApplication(req, res, next) {
    // get all application attributes
    const collectionName = req.body?.collectionName;
    const companyName = req.body?.application?.companyName;
    const jobTitle = req.body?.application?.jobTitle;
    const jobType = req.body?.application?.jobType;
    const location = req.body?.application?.location;
    const dateSubmitted = req.body?.application?.dateSubmitted;
    const salary = req.body?.application?.salary;
    const link = req.body?.application?.link;
    const status = req.body?.application?.status;
    const notes = req.body?.application?.notes;
    const _id = req.body?.application?._id;

    const userId = req.body?.userId;

    // make sure all attributes are defined
    if (collectionName === undefined || companyName === undefined || jobTitle === undefined || jobType === undefined ||
        location === undefined || dateSubmitted === undefined || salary === undefined || link === undefined ||
        status === undefined || notes === undefined || userId === undefined || _id === undefined) {
        return res.status(400).send();
    }

    try {
        await axios.post(process.env.APP_SERVICE_HOST + "/editApp", {
            collectionName, companyName, jobTitle, jobType,
            location, dateSubmitted, salary, link, status, notes, userId, _id
        });

        return res.send();
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}

async function deleteApplication(req, res, next) {
    const userId = req.body.userId;
    const applicationId = req.body.applicationId;

    if (!userId || !applicationId) {
        return res.status(400).send();
    }

    try {
        await axios.post(process.env.APP_SERVICE_HOST + "/deleteApp", { userId, applicationId });
        return res.send();
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

module.exports = {
    addApplication,
    getAllUserApplications,
    getAllUserCollections,
    deleteApplication,
    editApplication,
}