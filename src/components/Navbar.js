import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Pour gérer la déconnexion, si nécessaire
import '../styles/Navbar.css'; // Fichier CSS pour styliser la navbar

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Icône de déconnexion

const Navbar = () => {
  const { logout } = useAuth(); // Ajouter la fonction logout si nécessaire
  const navigate = useNavigate();

  // Récupérer le token et userId depuis localStorage
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    // Nettoyer le token et rediriger vers la page de connexion
    localStorage.clear();
    logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    // Rediriger l'utilisateur vers la page de son profil
    if (userId) {
      navigate(`/profile/${userId}`); // Assurez-vous que la route du profil existe
    } else {
      alert("Utilisateur non trouvé.");
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/polynomial-form">Calcul</Link>
        </li>
        <li>
          <Link to="/history">Historique</Link>
        </li>
        
      </ul>
      {/* Champ Profil qui prend le userId et le token */}
      
      {/* Bouton avec l'icône de déconnexion */}
      <button className="logout-btn" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} size="lg" /> {/* Icône de déconnexion */}
      </button>
    </nav>
  );
};

export default Navbar;
