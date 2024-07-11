const EmployeeModel = require("../model/Employee");

exports.login = (req, res) => {
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
};

exports.register = async (req, res) => {
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
};
