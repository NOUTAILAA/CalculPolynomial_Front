import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams(); // Récupérer l'ID de l'utilisateur depuis l'URL
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Si pas de token, rediriger vers la page de connexion
    } else {
      // Charger les informations de l'utilisateur depuis l'API
      axios.get(`http://localhost:8082/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          setError('Erreur de chargement des données.');
        });
    }
  }, [id, token, navigate]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    // Envoi de la requête pour mettre à jour les données utilisateur
    axios.put(`http://localhost:8082/api/users/${id}`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        alert('Profil mis à jour avec succès');
      })
      .catch(error => {
        alert('Erreur lors de la mise à jour du profil');
      });
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Profil de l'utilisateur</h2>
      {userData ? (
        <form onSubmit={handleUpdateProfile}>
          <div>
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              value={userData.username}
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
          </div>
          <div>
            <label>Téléphone</label>
            <input
              type="text"
              value={userData.telephone}
              onChange={(e) => setUserData({ ...userData, telephone: e.target.value })}
            />
          </div>
          <button type="submit">Mettre à jour le profil</button>
        </form>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default Profile;
