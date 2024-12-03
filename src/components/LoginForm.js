import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState(''); // Nouveau champ pour "Calculator"
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8082/api/calculators/login', {
        username,
        password,
      });
      if (response.status === 200) {
        onLogin();
      }
    } catch (err) {
      setError('Nom d’utilisateur ou mot de passe incorrect.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8082/api/users/register', {
        username,
        email,
        password,
        department, // Inclure le département pour le "Calculator"
        isCalculator: true, // Indiquer que c'est un Calculator
      });
      if (response.status === 201) {
        setError('Inscription réussie. Veuillez vérifier votre e-mail.');
      }
    } catch (err) {
      setError('Erreur lors de l’inscription.');
    }
  };

  return (
    <div className="login-form">
      <h2>{isRegistering ? 'Inscription' : 'Connexion'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={isRegistering ? handleRegisterSubmit : handleLoginSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {isRegistering && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Département"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </>
        )}
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegistering ? 'S’inscrire' : 'Se connecter'}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? S’inscrire'}
      </button>
    </div>
  );
}

export default LoginForm;
