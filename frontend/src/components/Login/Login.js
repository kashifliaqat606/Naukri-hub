import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './Login.css'; // Ensure this CSS file is included for any custom styling

function Login() {    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let valid = true;
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
        axios.post("http://localhost:3001/login", { email, password })
        .then(result => {
            if(result.data === "Success"){
                navigate("/home");
            } else {
                alert("You are not registered to this service");
            }
        })
        .catch(err => {
            console.log(err);
            setEmailError('An error occurred. Please try again later.');
        });
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
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <div className="input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
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
                        {emailError && <div className="text-danger mt-2">{emailError}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <div className="input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                            <input
                                type="password"
                                placeholder='Enter Password'
                                autoComplete='on'
                                name='password'
                                className={`form-control rounded-0 ${passwordError ? 'border-danger' : ''}`}
                                onChange={handlePasswordChange}
                                value={password}
                            />
                        </div>
                        {passwordError && <div className="text-danger mt-2">{passwordError}</div>}
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                </form>
                <p className="mt-3">Don't have an account?</p>
                <Link to="/roleselection" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default Login;
