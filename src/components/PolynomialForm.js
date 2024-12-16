import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Importer le hook pour accéder au contexte
import '../styles/PolynomialForm.css'; // Importer le fichier CSS

function PolynomialForm() {
  const { token } = useAuth(); // Récupérer le token depuis le contexte
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (method) => {
    setError('');
    setResult(null);

    try {
      let response;
      const headers = { 
        Authorization: `Bearer ${token}` // Ajouter le token JWT dans les en-têtes
      };

      if (method === 'sympy') {
        response = await axios.post('http://localhost:5000/process_polynomial', { expression }, { headers });
      } else if (method === 'numpy') {
        response = await axios.post('http://localhost:5004/calculateWithNumpy', { expression }, { headers });
      } else if (method === 'newton') {
        response = await axios.post('http://127.0.0.1:5001/process_polynomial_new', { expression }, { headers });
      } else {
        setError('Méthode non supportée');
        return;
      }

      // Si la réponse est correcte, afficher les résultats
      setResult(response.data);
    } catch (error) {
      setError('Polynome irrecevable');
    }
  };

  return (
    <div className="polynomial-form-container">
      <h1>Calcul des racines de polynômes</h1>
      <form className="polynomial-form">
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="Entrez une expression polynomiale"
        />
        <div>
          <button type="button" onClick={() => handleSubmit('sympy')}>
            SymPy
          </button>
          <button type="button" onClick={() => handleSubmit('newton')}>
            Newton Raphson
          </button>
          <button type="button" onClick={() => handleSubmit('numpy')}>
            NumPy
          </button>
          
        </div>
      </form>

      {error && <div className="error">{error}</div>}

      {result && (
  <div className="result-container">
    <h3>Résultats :</h3>
    <p><strong>Expression simplifiée :</strong> {result.simplifiedExpression}</p>
    <p><strong>Expression factorisée :</strong> {result.factoredExpression}</p>
    <div>
      <strong>Racines :</strong>
      <div className="roots-container">
        {result.roots.map((root, index) => (
          <div key={index} className="root-item">
            {root}
          </div>
        ))}
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default PolynomialForm;
