const JobModel = require("../model/Job");

exports.postJob = async (req, res) => {
    try {
        const { title, description, requirements } = req.body;

        const newJob = new JobModel({
            title,
            description,
            requirements,
        });

        const savedJob = await newJob.save();
        res.json(savedJob);
    } catch (err) {
        res.status(500).json(err);
    }
};
