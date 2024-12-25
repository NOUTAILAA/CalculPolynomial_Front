import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Initialisation de useNavigate

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

    const handleGoToLogin = () => {
        navigate('/login'); // Navigation vers /login
    };

    return (
        <div className="forgot-password-container">
            {/* Bouton SVG affiché en haut */}
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
