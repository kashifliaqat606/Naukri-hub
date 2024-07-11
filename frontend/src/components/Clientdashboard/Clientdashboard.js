import React from 'react';
import JobPostingForm from './JobPostingForm';

const EmployerDashboard = () => {
  return (
    <div className="employer-dashboard">
      <h1>Employer Dashboard</h1>
      <JobPostingForm />
      {/* Add other components like job listings and application management here */}
    </div>
  );
};

export default EmployerDashboard;
