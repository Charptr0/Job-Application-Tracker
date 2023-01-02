const { User } = require("./UserSchema");

/**
 * Updates the current application 
 * @param {string} userId the id of the user 
 * @param {object} modifiedApplication the modified application
 * @returns 
 */
async function updateApplication(userId, modifiedApplication) {
    try {
        // find the user
        const user = await User.findOne({ userId: userId });

        // user not found
        if (!user) {
            return null;
        }

        const applications = user.applications;

        // make the changes
        for (const app of applications) {
            if (app._id.toString() === modifiedApplication._id) {
                app.companyName = modifiedApplication.companyName;
                app.jobTitle = modifiedApplication.jobTitle;
                app.jobType = modifiedApplication.jobType;
                app.location = modifiedApplication.location;
                app.dateSubmitted = modifiedApplication.dateSubmitted;
                app.salary = modifiedApplication.salary;
                app.link = modifiedApplication.link;
                app.status = modifiedApplication.status;
                app.notes = modifiedApplication.notes;

                break;
            }
        }

        await user.save();
    } catch (err) {
        throw err;
    }
}

module.exports = {
    updateApplication,
}