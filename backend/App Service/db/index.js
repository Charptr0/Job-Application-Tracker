const { init } = require("./init");
const { User } = require("./UserSchema");
const { addApplication } = require("./insert");
const { fetchAllApplications } = require("./fetch");
const { deleteApplication } = require("./delete");
const { updateApplication } = require("./update");



module.exports = {
    init,
    User,
    addApplication,
    fetchAllApplications,
    deleteApplication,
    updateApplication,
}