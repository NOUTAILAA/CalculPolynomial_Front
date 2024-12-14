import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8082/api/calculators/forgot-password', null, {
                params: { email }
            });
            setSuccess(response.data);
            setError('');
        } catch (error) {
            setError(error.response ? error.response.data : 'Erreur lors de la réinitialisation du mot de passe');
            setSuccess('');
        }
    };

    return (
        <div className="forgot-password-container">
            <h2 className="title">Réinitialisation du Mot de Passe</h2>
            <form className="forgot-password-form" onSubmit={handleForgotPassword}>
                <div className="input-group">
                    <label htmlFor="email" className="label">Email :</label>
                    <input
                        type="email"
                        id="email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Entrez votre email"
                        required
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <button type="submit" className="submit-button">Réinitialiser le mot de passe</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
