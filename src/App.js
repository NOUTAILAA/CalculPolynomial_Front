import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import PolynomialForm from './components/PolynomialForm';
import Results from './components/Results';
import LoginForm from './components/LoginForm';
import './styles/App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Gestion de l'état de connexion
  const [expression, setExpression] = useState('');
  const [variable, setVariable] = useState(''); // Nouvel état pour la variable
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const response = await axios.post('http://localhost:5000/process_polynomial', {
        expression,
        variable: variable || 'x', // Inclure la variable dans la requête
      });
      setResult(response.data);
    } catch (err) {
      setError('Une erreur est survenue. Vérifiez votre saisie ou réessayez plus tard.');
    }
  };

  const handleClear = () => {
    setExpression('');
    setVariable('x'); // Réinitialise la variable à 'x' par défaut
    setResult(null);
    setError('');
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/solver" replace />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/solver"
            element={
              isLoggedIn ? (
                <>
                  <h1>Polynomial Solver</h1>
                  <PolynomialForm
                    expression={expression}
                    setExpression={setExpression}
                    variable={variable} // Passez la variable
                    setVariable={setVariable} // Passez le setter de la variable
                    handleSubmit={handleSubmit}
                    handleClear={handleClear}
                  />
                  <Results result={result} error={error} />
                </>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
