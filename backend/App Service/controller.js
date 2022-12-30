const db = require("./db");
require("dotenv").config();

async function addApplication(req, res, next) {
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


    try {
        await db.addApplication(userId, applicationReq);
        return res.send();

    } catch (err) {
        console.error(err);
        throw err;
    }


}

async function getAllUserApplications(req, res, next) {
    const userId = req.body.userId;

    try {
        const applications = await db.fetchAllApplications(userId);

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

module.exports = {
    addApplication,
    getAllUserApplications,

}