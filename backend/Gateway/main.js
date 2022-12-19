const express = require('express');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_HOST]
}));

const PORT = process.env.PORT || 4000;
app.use("/user", userRoutes);

app.get('/', (req, res) => {
    res.send();
});

function startServer() {
    app.listen(PORT, () => console.log(`Gateway listening on port ${PORT}`));
}

startServer();