const express = require('express');
const cors = require('cors');
const db = require("./db");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: [process.env.GATEWAY_HOST]
}));

const PORT = process.env.PORT || 4003;

async function addUser() {
    // const user = new db.User({
    //     userId: "1234",
    //     applications: [{
    //         collectionName: "test",
    //         companyName: "company",
    //         jobTitle: "title",
    //         jobType: "type",
    //         location: "location",
    //         dateSubmitted: "date",
    //         salary: "1234",
    //         link: "link",
    //         status: "status",
    //         notes: "notes",
    //     }]
    // });

    // await user.save();

    // console.log(user);

    const user = await db.User.findOne({ collectionName: "test" });

    console.log(user);

}

db.init().then(() => {
    app.listen(PORT, () => console.log(`App Service listening on PORT ${PORT}`));
    addUser();
}); 