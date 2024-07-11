const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = "mongodb://127.0.0.1:27017/employee";

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("Error connecting to MongoDB", err);
    });

// Use authentication routes
app.use("/auth", authRoutes);

// Use job routes
app.use("/jobs", jobRoutes);

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
