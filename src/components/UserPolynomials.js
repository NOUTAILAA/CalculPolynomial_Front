import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserPolynomials = () => {
  const { userId } = useParams(); // Récupère l'ID de l'utilisateur depuis l'URL
  const navigate = useNavigate();
  const [polynomials, setPolynomials] = useState([]);

  useEffect(() => {
    const fetchPolynomials = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/users/${userId}/polynomials`);
        setPolynomials(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des polynômes :", error);
      }
    };
    fetchPolynomials();
  }, [userId]);

  return (
    <div className="polynomial-container">
      <h2>Calculs de l'utilisateur {userId}</h2>
      <button onClick={() => navigate("/manage-calculators")} className="back-button">
        Retour
      </button>
      {polynomials.length > 0 ? (
        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Expression Simplifiée</th>
              <th>Expression Factorisée</th>
              <th>Racines</th>
            </tr>
          </thead>
          <tbody>
            {polynomials.map((poly) => (
              <tr key={poly.id}>
                <td>{poly.id}</td>
                <td>{poly.simplifiedExpression}</td>
                <td>{poly.factoredExpression}</td>
                <td>{poly.roots}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun calcul trouvé pour cet utilisateur.</p>
      )}
    </div>
  );
};

export default UserPolynomials;
