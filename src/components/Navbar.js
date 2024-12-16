import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Pour gérer la déconnexion, si nécessaire
import '../styles/Navbar.css'; // Fichier CSS pour styliser la navbar

const Navbar = () => {
  const { logout } = useAuth(); // Ajouter la fonction logout si nécessaire
  const navigate = useNavigate();

  const handleLogout = () => {
    // Nettoyer le token et rediriger vers la page de connexion
    localStorage.clear();
    logout();
    navigate('/login');
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
      <button className="logout-btn" onClick={handleLogout}>
        Déconnexion
      </button>
    </nav>
  );
};

export default Navbar;
