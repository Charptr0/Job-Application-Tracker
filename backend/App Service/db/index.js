const { init } = require("./init");
const { User } = require("./UserSchema");
const { addApplication } = require("./insert");
const { fetchAllApplications } = require("./fetch");

module.exports = {
    init,
    User,
    addApplication,
    fetchAllApplications,
}