import React, { useState } from 'react';
import './RoleSelection.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faBriefcase } from '@fortawesome/free-solid-svg-icons';

function RoleSelection() {
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleCreateAccount = () => {
        if (role) {
            navigate(`/register?role=${role}`);
        } else {
            alert('Please select a role');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-5 rounded" style={{ maxWidth: '500px', width: '90%' }}>
                <h2 className="text-center mb-4">Join as a Job Seeker or Job Poster</h2>
                <div className="form-check mb-4">
                    <input
                        type="radio"
                        id="client"
                        name="role"
                        value="client"
                        className="form-check-input"
                        checked={role === 'client'}
                        onChange={handleRoleChange}
                    />
                    <label className="form-check-label d-flex align-items-center" htmlFor="client">
                        <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                        I’m a client, Posting Job for Employer
                    </label>
                </div>
                <div className="form-check mb-4">
                    <input
                        type="radio"
                        id="freelancer"
                        name="role"
                        value="freelancer"
                        className="form-check-input"
                        checked={role === 'freelancer'}
                        onChange={handleRoleChange}
                    />
                    <label className="form-check-label d-flex align-items-center" htmlFor="freelancer">
                        <FontAwesomeIcon icon={faUserTie} className="me-2" />
                        I’m a Job seeker, looking for work
                    </label>
                </div>
                <button className="btn btn-success btn-lg w-100 mb-3" onClick={handleCreateAccount}>
                    Join as {role === 'client' ? 'a Job Poster' : role === 'freelancer' ? 'a Job Seeker' : ''}
                </button>
                <p className="text-center">Already have an account? <a href="/login">Log In</a></p>
            </div>
        </div>
    );
}

export default RoleSelection;
