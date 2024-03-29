const { User } = require("./UserSchema");
/**
 * add a application to a user given user id
 * @param {string} userId 
 * @param {Object} applicationReq
 */
async function addApplication(userId, applicationReq) {
    try {
        // first check if the user exists
        const user = await User.findOne({ userId: userId });

        // user DNE, create a new user instance
        if (user === null) {
            const newUser = new User({
                userId: userId,
                collections: [applicationReq.collectionName],
                applications: [{
                    collectionName: applicationReq.collectionName,
                    companyName: applicationReq.companyName,
                    jobTitle: applicationReq.jobTitle,
                    jobType: applicationReq.jobType,
                    location: applicationReq.location,
                    dateSubmitted: applicationReq.dateSubmitted,
                    salary: applicationReq.salary,
                    link: applicationReq.link,
                    status: applicationReq.status,
                    notes: applicationReq.notes,
                }]
            });

            // save the record db
            await newUser.save();
        }

        // user exist, append this new application
        else {
            user.applications.push({
                collectionName: applicationReq.collectionName,
                companyName: applicationReq.companyName,
                jobTitle: applicationReq.jobTitle,
                jobType: applicationReq.jobType,
                location: applicationReq.location,
                dateSubmitted: applicationReq.dateSubmitted,
                salary: applicationReq.salary,
                link: applicationReq.link,
                status: applicationReq.status,
                notes: applicationReq.notes,
            });

            await user.save();
        }

    } catch (err) {
        throw err;
    }
}

async function addCollection(userId, collectionName) {
    try {
        // first check if the user exists
        const user = await User.findOne({ userId: userId });

        if (user === null) {
            const newUser = new User({
                userId: userId,
                collections: [collectionName],
                applications: [],
            });

            await newUser.save();
        }

        else {
            user.collections.push(collectionName);
            await user.save();
        }

    } catch (err) {
        throw err;
    }
}

module.exports = {
    addApplication,
    addCollection,
}