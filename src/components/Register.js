import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import pour la navigation

import '../styles/Register.css'; // Import des styles corrigés

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Initialisation de useNavigate

    const handleGoToLogin = () => {
        navigate('/login'); // Navigation vers /login
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8082/api/calculators/register', {
                username,
                email,
                password
            });
            setSuccess(response.data);
            setError('');
        } catch (error) {
            setError(error.response ? error.response.data : 'Erreur lors de l\'inscription');
            setSuccess('');
        }
    };

    return (
        <div className="form-containerr">
         <div className="back-button" onClick={handleGoToLogin}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="back-svg"
                >
                    <polyline points="15 18 9 12 15 6" />
                    <path d="M19 12H9" />
                </svg>
            </div>
            <p className="titlee">Create an Account</p>
            <form className="formm" onSubmit={handleRegister}>
                <input
                    type="textt"
                    className="inputt"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    className="inputt"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <button className="form-btn" type="submit">Sign up</button>
            </form>
        </div>
    );
};

export default Register;
