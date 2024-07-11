const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['Full-Time', 'Part-Time', 'Contract'], default: 'Full-Time' },
  salary: { type: String, required: true },

});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
