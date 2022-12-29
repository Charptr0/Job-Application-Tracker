const mongoose = require("mongoose");
require("dotenv");

async function init() {
    try {
        await mongoose.connect(process.env.MONGO_HOST);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    init,
}