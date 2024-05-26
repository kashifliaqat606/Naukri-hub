const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./model/Employee");

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = "mongodb://127.0.0.1:27017/Naukarihub";

mongoose.connect(mongoURI)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(err => {
    console.error("Error connecting to MongoDB", err);
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No record existed");
            }
        })
        .catch(err => {
            res.status(500).json("Error logging in");
        });
});

app.post("/register", (req, res) => {
    EmployeeModel.create(req.body)
        .then(employee => res.json(employee))
        .catch(err => res.status(500).json(err));
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
