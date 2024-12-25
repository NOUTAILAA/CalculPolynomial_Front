import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Importer le hook pour accéder au contexte
import '../styles/PolynomialForm.css'; // Importer le fichier CSS
import Navbar from './Navbar'; // Importer la navbar

function PolynomialForm() {
  const { token } = useAuth(); // Récupérer le token depuis le contexte
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [graphUrl, setGraphUrl] = useState(null); // Ajouter un état pour stocker l'URL du graphe
  const [activeView, setActiveView] = useState(''); // Détermine quelle vue est active

  const handleSubmit = async (method) => {
    setError('');
    setResult(null);
    setGraphUrl(null); // Masquer le graphe lorsque d'autres méthodes sont appelées
    setActiveView(method); // Activer la vue correspondante

    try {
      const userId = localStorage.getItem('userId'); // Récupérer l'userId depuis le localStorage
      const headers = {
        Authorization: `Bearer ${token}`, // Ajouter le token JWT dans les en-têtes
      };

      const requestBody = {
        expression,
        userId, // Inclure l'userId dans le corps de la requête
      };

      const urlMap = {
        sympy: 'http://localhost:5110/process_polynomial',
        numpy: 'http://localhost:5004/calculateWithNumpy',
        newton: 'http://127.0.0.1:5001/process_polynomial_new',
      };

      const response = await axios.post(urlMap[method], requestBody, { headers });

      // Si la réponse est correcte, afficher les résultats
      setResult(response.data);
    } catch (error) {
      setError('Polynôme irrecevable');
    }
  };

  const handlePlot = async () => {
    setError('');
    setResult(null); // Masquer les résultats des méthodes lorsque le graphe est affiché
    setActiveView('plot'); // Activer la vue du graphe

    try {
      const headers = {
        Authorization: `Bearer ${token}`, // Ajouter le token JWT dans les en-têtes
      };

      const response = await axios.post(
        'http://localhost:5110/plot_polynomial',
        { expression },
        { headers, responseType: 'blob' }
      );

      // Créer une URL blob pour afficher l'image
      const url = URL.createObjectURL(response.data);
      setGraphUrl(url);
    } catch (error) {
      setError('Impossible de générer le graphe');
    }
  };

  return (
    <div>
      <Navbar /> {/* Ajouter la navbar */}

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
            <button
              type="button"
              onClick={() => handleSubmit('sympy')}
              className={activeView === 'sympy' ? 'active-button' : ''}
            >
              SymPy
            </button>
            <button
              type="button"
              onClick={() => handleSubmit('newton')}
              className={activeView === 'newton' ? 'active-button' : ''}
            >
              Newton Raphson
            </button>
            <button
              type="button"
              onClick={() => handleSubmit('numpy')}
              className={activeView === 'numpy' ? 'active-button' : ''}
            >
              NumPy
            </button>
            <button
              type="button"
              onClick={handlePlot}
              className={activeView === 'plot' ? 'active-button' : ''}
            >
              Afficher le graphe
            </button>
          </div>
        </form>

        {error && <div className="error">{error}</div>}

        {activeView !== 'plot' && result && (
          <div className="result-container">
            <h3>Résultats pour {activeView} :</h3>
            <p>
              <strong>Expression simplifiée :</strong> {result.simplifiedExpression}
            </p>
            <p>
              <strong>Expression factorisée :</strong> {result.factoredExpression}
            </p>
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

        {activeView === 'plot' && graphUrl && (
          <div className="graph-container">
            <h3>Graphe :</h3>
            <img src={graphUrl} alt="Graph of the polynomial" />
          </div>
        )}
      </div>
    </div>
  );
}

export default PolynomialForm;
