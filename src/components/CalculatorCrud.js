import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CalculatorCrud.css"; // Importation du fichier CSS

const CalculatorCrud = () => {
  const [calculators, setCalculators] = useState([]);
  const [form, setForm] = useState({ username: "", email: "", telephone: "" });
  const [editingId, setEditingId] = useState(null);

  // Charger tous les calculateurs
  const fetchCalculators = async () => {
    try {
      const response = await axios.get("http://localhost:8082/api/calculators");
      setCalculators(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  };

  useEffect(() => {
    fetchCalculators();
  }, []);

  // Ajouter ou mettre à jour un calculateur
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8082/api/calculators/${editingId}`, form);
      } else {
        await axios.post("http://localhost:8082/api/calculators/register", form);
      }
      fetchCalculators();
      setForm({ username: "", email: "", telephone: "" });
      setEditingId(null);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    }
  };

  // Supprimer un calculateur
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/api/calculators/${id}`);
      fetchCalculators();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  // Remplir le formulaire pour la modification
  const handleEdit = (calculator) => {
    setForm({ username: calculator.username, email: calculator.email, telephone: calculator.telephone });
    setEditingId(calculator.id);
  };

  return (
    <div className="crud-container">
      <h2>Gestion des Calculateurs</h2>
      <form className="crud-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Téléphone"
          value={form.telephone}
          onChange={(e) => setForm({ ...form, telephone: e.target.value })}
        />
        <button className="crud-button submit-btn" type="submit">
          {editingId ? "Modifier" : "Ajouter"}
        </button>
      </form>
      <table className="crud-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom d'utilisateur</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {calculators.map((calc) => (
            <tr key={calc.id}>
              <td>{calc.id}</td>
              <td>{calc.username}</td>
              <td>{calc.email}</td>
              <td>{calc.telephone}</td>
              <td>
                <button className="crud-button edit-btn" onClick={() => handleEdit(calc)}>
                  Modifier
                </button>
                <button className="crud-button delete-btn" onClick={() => handleDelete(calc.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalculatorCrud;
