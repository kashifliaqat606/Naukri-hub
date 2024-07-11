import React, { useState } from 'react';
import axios from 'axios'; // Make sure you import axios
import './JobPostingForm.css';

const JobPostingForm = () => {
  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    type: 'Full-Time',
    salary: ''
  });
  const [message, setMessage] = useState(''); // State for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({
      ...jobDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/postjob', jobDetails);
      setMessage('Job posted successfully!');
      console.log(response.data);
    } catch (error) {
      setMessage('Failed to post job. Please try again.');
      console.error('There was an error posting the job!', error);
    }
  };

  return (
    <div>
      <form className="job-posting-form" onSubmit={handleSubmit}>
        <div>
          <label>Job Title:</label>
          <input type="text" name="title" value={jobDetails.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Job Description:</label>
          <textarea name="description" value={jobDetails.description} onChange={handleChange} required></textarea>
        </div>
        <div>
          <label>Requirements:</label>
          <textarea name="requirements" value={jobDetails.requirements} onChange={handleChange} required></textarea>
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" value={jobDetails.location} onChange={handleChange} required />
        </div>
        <div>
          <label>Job Type:</label>
          <select name="type" value={jobDetails.type} onChange={handleChange}>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div>
          <label>Salary:</label>
          <input type="text" name="salary" value={jobDetails.salary} onChange={handleChange} />
        </div>
        <button type="submit">Post Job</button>
      </form>
      {message && <p>{message}</p>} {/* Display success/failure message */}
    </div>
  );
};

export default JobPostingForm;
