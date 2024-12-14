import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Importing the AuthContext hook
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { login } = useAuth(); // Use the login function from AuthContext
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8082/api/calculators/login', { email, password });

      if (response.status === 200 || response.status === 201) {
        const token = response.data.token;

        // Use the login function to store the token
        login(token);

        setSuccessMessage('Connexion réussie!');
        setError('');
        alert('Connexion réussie!');
        
        // Redirect to the main page after successful login
        navigate('/polynomial-form');
      } else {
        setError('Email ou mot de passe incorrect.');
      }
    } catch (error) {
      setSuccessMessage('');
      setError(error.response ? error.response.data.message : 'Erreur lors de la connexion');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password'); // Navigate to /forgot-password
  };

  const handleSignUp = () => {
    navigate('/register'); // Navigate to /register
  };

  return (
    <div className="form-container">
      <p className="title">Welcome back</p>
      <form className="form" onSubmit={handleLogin}>
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
        <p className="page-link" onClick={handleForgotPassword} style={{ cursor: 'pointer' }}>
          <span className="page-link-label">Forgot Password?</span>
        </p>
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button className="form-btn" type="submit">Log in</button>
      </form>
      <p className="sign-up-label">
        Don't have an account?{' '}
        <span className="sign-up-link" onClick={handleSignUp}>
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;
