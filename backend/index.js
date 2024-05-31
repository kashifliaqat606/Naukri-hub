const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./model/Employee");

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

    app.post("/login", (req, res) => {
        const { email, password } = req.body;
        EmployeeModel.findOne({ email: email })
            .then(user => {
                if (!user) {
                    return res.status(400).json({ error: "No record existed" });
                }
    
                if (user.password !== password) {
                    return res.status(400).json({ error: "The password is incorrect" });
                }
    
                res.json({ message: "Success", role: user.role });
            })
            .catch(err => {
                res.status(500).json({ error: "Error logging in" });
            });
    });
    
app.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!role) {
            return res.status(400).json({ error: "Role is required" });
        }

        const newEmployee = new EmployeeModel({
            name,
            email,
            password,
            role,
        });

        const savedEmployee = await newEmployee.save();
        res.json(savedEmployee);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
