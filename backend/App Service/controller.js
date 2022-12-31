const db = require("./db");
require("dotenv").config();

/**
 * Controller for adding an application to the database 
 */
async function addApplication(req, res, next) {
    // construct the application request
    const applicationReq = {
        collectionName: req.body.collectionName,
        companyName: req.body.companyName,
        jobTitle: req.body.jobTitle,
        jobType: req.body.jobType,
        location: req.body.location,
        dateSubmitted: req.body.dateSubmitted,
        salary: req.body.salary,
        link: req.body.link,
        status: req.body.status,
        notes: req.body.notes,
    }

    const userId = req.body.userId;


    // add to db
    try {
        await db.addApplication(userId, applicationReq);
        return res.send();

    } catch (err) {
        console.error(err);
        throw err;
    }
}

/**
 * Controller for getting all application in the db from a certain user 
 */
async function getAllUserApplications(req, res, next) {
    const userId = req.body.userId;

    // fetch all applications
    try {
        const applications = await db.fetchAllApplications(userId);

        // no application found
        if (applications === null) {
            return res.json({
                applications: []
            });
        }

        else {
            return res.json({
                applications
            })
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function editApplication(req, res, next) {
    // construct the application request
    const applicationReq = {
        _id: req.body._id,
        collectionName: req.body.collectionName,
        companyName: req.body.companyName,
        jobTitle: req.body.jobTitle,
        jobType: req.body.jobType,
        location: req.body.location,
        dateSubmitted: req.body.dateSubmitted,
        salary: req.body.salary,
        link: req.body.link,
        status: req.body.status,
        notes: req.body.notes,
    }

    const userId = req.body.userId;


    // make changes to db
    try {
        await db.updateApplication(userId, applicationReq);
        return res.send();

    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

async function deleteApplication(req, res, next) {
    const userId = req.body.userId;
    const applicationId = req.body.applicationId;

    try {
        const response = await db.deleteApplication(userId, applicationId);

        // did not find the user
        if (response === null) {
            return res.status(404).send();
        }

        return res.send();

    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

module.exports = {
    addApplication,
    getAllUserApplications,
    deleteApplication,
    editApplication,
}