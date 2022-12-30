const express = require('express');
const cors = require('cors');
const appRoute = require("./routes");
const db = require("./db");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: [process.env.GATEWAY_HOST, "*"]
}));

const PORT = process.env.PORT || 4003;

app.use("/", appRoute);

db.init().then(() => {
    app.listen(PORT, () => console.log(`App Service listening on PORT ${PORT}`));
}); 