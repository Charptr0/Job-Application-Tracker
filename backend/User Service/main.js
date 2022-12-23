const express = require("express");
const db = require("./Utils/db");
const cors = require("cors");
const userRoute = require("./routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors({
    origin: [process.env.GATEWAY_HOST],
}));

app.use(express.json());
app.use("/", userRoute);

// start the database and server
db.init().then((err) => {
    if (err) {
        console.log(`Cannot start user server due to ${err}`);
        return;
    }

    // start the server once db is initialized
    app.listen(PORT, () => {
        console.log(`User Service listening on port ${PORT}`);
    });
});