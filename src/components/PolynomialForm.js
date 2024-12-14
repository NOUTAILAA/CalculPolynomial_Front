import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';  // Importer le hook pour accéder au contexte

function PolynomialForm() {
  const { token } = useAuth(); // Récupérer le token depuis le contexte
  const [expression, setExpression] = useState('');
  const [variable, setVariable] = useState('x');
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
      setError('Erreur lors du traitement du polynôme');
    }
  };

  return (
    <div>
      <h1>Calcul des racines de polynômes</h1>
      <form className="polynomial-form">
        <div style={{ marginBottom: '10px' }}>
          <label>
            Variable :
            <input
              type="text"
              value={variable}
              onChange={(e) => setVariable(e.target.value || 'x')}
              placeholder="x"
              style={{ marginLeft: '10px', width: '50px' }}
            />
          </label>
        </div>
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="Entrez une expression polynomiale"
        />
        <div>
          <button type="button" onClick={() => handleSubmit('sympy')} style={{ marginLeft: '10px' }}>
            SymPy
          </button>
          <button type="button" onClick={() => handleSubmit('numpy')} style={{ marginLeft: '10px' }}>
            NumPy
          </button>
          <button type="button" onClick={() => handleSubmit('newton')} style={{ marginLeft: '10px' }}>
            Newton
          </button>
        </div>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {result && (
        <div>
          <h3>Résultats :</h3>
          <p><strong>Expression simplifiée :</strong> {result.simplifiedExpression}</p>
          <p><strong>Expression factorisée :</strong> {result.factoredExpression}</p>
          <p><strong>Racines :</strong> {result.roots.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default PolynomialForm;
