// index.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const otpRoutes = require('./routes/otpRoutes');

require("dotenv").config();

const dbUser = process.env.MONGODB_URL;

mongoose
    .connect(
        dbUser,
        { useNewUrlParser: true, useUnifiedTopology: true } // Add these options for MongoDB connection
    )
    .then(() => {
        console.log("Connected to MongoDB database!");
    })
    .catch((error) => {
        console.error("Connection failed!", error); // Log the error for better debugging
    });

app.use(
    cors({
        origin: "*",
    })
);
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());

app.use('/api', otpRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});