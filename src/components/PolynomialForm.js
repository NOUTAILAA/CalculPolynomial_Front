// src/components/PolynomialForm.js
import React from 'react';

function PolynomialForm({ expression, setExpression, handleSubmit, handleClear }) {
  return (
    <form onSubmit={handleSubmit} className="polynomial-form">
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="Entrez une expression polynomiale"
      />
      <button type="submit">Calculer</button>
      <button type="button" onClick={handleClear} style={{ marginLeft: '10px' }}>Effacer</button>
    </form>
  );
}

export default PolynomialForm;
