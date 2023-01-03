const { init } = require("./init");
const { User } = require("./UserSchema");
const { addApplication, addCollection } = require("./insert");
const { fetchAllApplications, fetchAllCollections } = require("./fetch");
const { deleteApplication } = require("./delete");
const { updateApplication } = require("./update");



module.exports = {
    init,
    User,
    addApplication,
    addCollection,
    fetchAllApplications,
    deleteApplication,
    updateApplication,
    fetchAllCollections,
}