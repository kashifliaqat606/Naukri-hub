const express = require('express');
const router = express.Router();
const jobController = require('../controllers/Jobcontroller');

router.post("/postjob", jobController.postJob);

module.exports = router;
