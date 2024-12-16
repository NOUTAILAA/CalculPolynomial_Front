import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Réutiliser la navbar
import '../styles/History.css'; // Nouveau fichier CSS pour un affichage amélioré

const History = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  // Nettoyer et parser les racines
  const cleanRoots = (roots) => {
    if (!roots || roots === '[]') return ['Aucune racine disponible']; // Gérer les valeurs nulles ou vides
  
    if (typeof roots === 'string') {
      try {
        const cleanedRoots = roots.replace(/\(/g, '[').replace(/\)/g, ']'); // Nettoyer pour les crochets
        return JSON.parse(cleanedRoots);
      } catch {
        console.warn('Format invalide pour roots:', roots);
        return [roots]; // Retour brut en cas d'erreur
      }
    }
  
    return Array.isArray(roots) ? roots : ['Format invalide'];
  };
  
  useEffect(() => {
    const fetchHistory = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
  
      if (!token || !userId) {
        setError('Veuillez vous reconnecter.');
        return;
      }
  
      try {
        const headers = { Authorization: `Bearer ${token}` };
  
        const response = await axios.get(`http://localhost:8082/api/users/${userId}/polynomials`, { headers });
        const sortedHistory = response.data.sort((a, b) => a.id - b.id);
        setHistory(sortedHistory);
      } catch (error) {
        console.error('Erreur API:', error);
        setError('Erreur lors de la récupération de l’historique');
      }
    };
  
    fetchHistory();
  }, []);
  
  return (
    <div>
      <Navbar />
      <div className="history-container">
        <h1 className="history-title">📚 Historique des Polynômes</h1>
        {error && <div className="error">{error}</div>}
        {history.length > 0 ? (
          <div className="history-card-container">
            {history.map((item, index) => (
              <div key={index} className="history-card">
                <div className="card-header">
                  <h3>Polynôme #{index + 1}</h3>
                </div>
                <div className="card-body">
                  <p><strong>Expression :</strong> {item.simplifiedExpression || "Non disponible"}</p>
                  <p><strong>Factorisation :</strong> {item.factoredExpression || "Non disponible"}</p>
                  <p><strong>Racines :</strong> {cleanRoots(item.roots).join(', ') || "Aucune racine disponible"}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-history">Aucun polynôme enregistré.</p>
        )}
      </div>
    </div>
  );
};

export default History;
