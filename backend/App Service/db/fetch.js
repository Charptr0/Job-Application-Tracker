const { User } = require("./UserSchema");
/**
 * fetch all applications with the given userId
 * @param {string} userId 
 */
async function fetchAllApplications(userId) {
    try {
        const user = await User.findOne({ userId: userId });

        // user DNE or the user do not have any applications
        if (user === null || user.applications.length === 0) {
            return null;
        }

        // return all applications associated with this user
        return user.applications;

    } catch (err) {
        throw err;
    }
}

module.exports = {
    fetchAllApplications,
}