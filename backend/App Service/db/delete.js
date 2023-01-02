const { User } = require("./UserSchema");

/**
 * Delete a application from the database
 * @param {string} userId the id of the user
 * @param {string} applicationId the id of the application
 * @throws {Error} database error
 */
async function deleteApplication(userId, applicationId) {
    // find the user
    try {
        const user = await User.findOne({ userId: userId });

        if (!user) {
            return null;
        }

        // remove the application 
        const filteredApplication = user.applications.filter(app => app._id.toString() !== applicationId);
        user.applications = filteredApplication;

        // save the changes
        await user.save();
    } catch (err) {
        throw err;
    }
}

module.exports = {
    deleteApplication,
}