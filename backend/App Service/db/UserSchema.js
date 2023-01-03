const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: String,
    collections: [String],
    applications: [{
        collectionName: String,
        companyName: String,
        jobTitle: String,
        jobType: String,
        location: String,
        dateSubmitted: String,
        salary: String,
        link: String,
        status: String,
        notes: String,
    }],
})

module.exports = {
    User: mongoose.model("User", userSchema)
};