const { init } = require("./init");
const { User } = require("./UserSchema");
const { addApplication } = require("./insert");
const { fetchAllApplications } = require("./fetch");
const { deleteApplication } = require("./delete");


module.exports = {
    init,
    User,
    addApplication,
    fetchAllApplications,
    deleteApplication,
}