const express = require('express');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
const authRoutes = require('./Routes/authRoutes');
const cookieParser = require('cookie-parser');
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_HOST],
    credentials: true,
}));

app.use(cookieParser());

const PORT = process.env.PORT || 4000;

app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.get('/', (req, res) => res.send());

function startServer() {
    app.listen(PORT, () => console.log(`Gateway listening on port ${PORT}`));
}

startServer();