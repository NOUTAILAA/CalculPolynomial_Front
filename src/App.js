// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import PolynomialForm from './components/PolynomialForm';
import Results from './components/Results';
import './styles/App.css';

function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const response = await axios.post('http://localhost:5000/process_polynomial', {
        expression,
      });
      setResult(response.data);
    } catch (err) {
      setError('Une erreur est survenue. Vérifiez votre saisie ou réessayez plus tard.');
    }
  };

  const handleClear = () => {
    setExpression('');
    setResult(null); // Réinitialiser les résultats
    setError(''); // Réinitialiser les erreurs
  };

  return (
    <div className="app">
      <h1>Polynomial Solver</h1>
      <PolynomialForm
        expression={expression}
        setExpression={setExpression}
        handleSubmit={handleSubmit}
        handleClear={handleClear} // Passer la fonction handleClear
      />
      <Results result={result} error={error} />
    </div>
  );
}

export default App;
