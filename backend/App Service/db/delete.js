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

/**
 * Delete the collection from the database and all the applications associated with the name
 * @param {string} userId the id of the user
 * @param {string} collectionName the collection name
 * @returns 
 */
async function deleteCollection(userId, collectionName) {
    try {
        const user = await User.findOne({ userId: userId });

        if (!user) {
            return null;
        }

        // remove the collection
        const filteredCollection = user.collections.filter(collection => collection !== collectionName);

        // remove all the application 
        const filteredApplication = user.applications.filter(app => app.collectionName !== collectionName);

        // update the applications and collections
        user.applications = filteredApplication;
        user.collections = filteredCollection;

        // save the changes
        await user.save();

    } catch (err) {
        throw err;
    }
}

module.exports = {
    deleteApplication,
    deleteCollection,
}