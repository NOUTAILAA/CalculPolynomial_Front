import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css'; // Réutiliser les styles existants

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
        <div className="form-container">
            <p className="title">Create an Account</p>
            <form className="form" onSubmit={handleRegister}>
                <input
                    type="text"
                    className="input"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    className="input"
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
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                {success && <div style={{ color: 'green', marginTop: '10px' }}>{success}</div>}
                <button className="form-btn" type="submit">Sign up</button>
            </form>
       
        </div>
    );
};

export default Register;
