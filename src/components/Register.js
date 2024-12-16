import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Register.css'; // Import des styles corrigés

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
        <div className="form-containerr">
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
