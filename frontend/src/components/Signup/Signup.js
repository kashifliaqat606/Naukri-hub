import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './Signup.css'; // Ensure this CSS file is included for any custom styling

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const role = params.get('role');
        if (role) {
            setRole(role);
        } else {
          
            navigate('/roleselection'); // Redirect to role selection if no role is provided
        }
    }, [location, navigate]);

    const validateForm = () => {
        let valid = true;

        if (!name) {
            setNameError('Name is required');
            valid = false;
        } else {
            setNameError('');
        }

        if (!email) {
            setEmailError('Email is required');
            valid = false;
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                setEmailError('Please enter a valid email address');
                valid = false;
            } else {
                setEmailError('');
            }
        }

        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        } else {
            setPasswordError('');
        }

        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        axios.post("http://localhost:3001/register", { name, email, password, role })
            .then(result => {
                console.log(result);
                navigate("/login");
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (nameError) {
            validateForm();
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (emailError) {
            validateForm();
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (passwordError) {
            validateForm();
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-4 rounded w-100" style={{ maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 input-group">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                        <input
                            type="text"
                            placeholder='Enter Name'
                            autoComplete='off'
                            name='name'
                            className={`form-control rounded-0 ${nameError ? 'border-danger' : ''}`}
                            onChange={handleNameChange}
                            value={name}
                        />
                    </div>
                    {nameError && <div className="text-danger mb-3">{nameError}</div>}
                    <div className="mb-3 input-group">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <input
                            type="text"
                            placeholder='user123@gmail.com'
                            autoComplete='on'
                            name='email'
                            className={`form-control rounded-0 ${emailError ? 'border-danger' : ''}`}
                            onChange={handleEmailChange}
                            value={email}
                        />
                    </div>
                    {emailError && <div className="text-danger mb-3">{emailError}</div>}
                    <div className="mb-3 input-group">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            name='password'
                            className={`form-control rounded-0 ${passwordError ? 'border-danger' : ''}`}
                            onChange={handlePasswordChange}
                            value={password}
                        />
                    </div>
                    {passwordError && <div className="text-danger mb-3">{passwordError}</div>}
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Sign Up
                    </button>
                </form>
                <p className="mt-3">Already have an account?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
