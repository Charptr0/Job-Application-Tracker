const express = require('express');
const cors = require('cors');
const authRoute = require('./routes');
const db = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4002;

app.use(express.json());
app.use(cors({
    origin: [process.env.GATEWAY_HOST]
}));

app.use("/", authRoute);

db.init().then(() => {
    app.listen(PORT, () => console.log(`Auth Service listening on PORT ${PORT}`));
})
