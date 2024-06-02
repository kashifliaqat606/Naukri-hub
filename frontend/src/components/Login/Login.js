import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import './Login.css'; // Ensure this CSS file is included for any custom styling

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let valid = true;

        if (!email) {
            setEmailError('Email is required');
            valid = false;
        } else {
            setEmailError('');
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
            .then(response => {
                if (response.data.message === "Success") {
                    if (response.data.role === "client") {
                        navigate("/client-dashboard");
                    } else if (response.data.role === "freelancer") {
                        navigate("/freelancer-dashboard");
                    }
                } else {
                    setLoginError(response.data.error);
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    setLoginError(err.response.data.error);
                } else {
                    setLoginError("An error occurred. Please try again.");
                }
            });
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (emailError || loginError) {
            validateForm();
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (passwordError || loginError) {
            validateForm();
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-5 rounded w-100" style={{ maxWidth: '500px', height: 'auto' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
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
                    {loginError && <div className="text-danger mb-3">{loginError}</div>}
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                </form>
                <div className="mt-3">
                    <button className="btn btn-primary w-100 rounded-0 d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon icon={faGoogle} className="me-2" />
                        Sign in with Google
                    </button>
                </div>
                <p className="mt-3">Don't have an account?</p>
                <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default Login;
