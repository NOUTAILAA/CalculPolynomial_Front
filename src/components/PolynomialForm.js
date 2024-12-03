// src/components/PolynomialForm.js
import React from 'react';

function PolynomialForm({ expression, setExpression, variable, setVariable, handleSubmit, handleClear }) {
  return (
    <form onSubmit={handleSubmit} className="polynomial-form">
      <div style={{ marginBottom: '10px' }}>
        <label>
          Variable :
          <input
            type="text"
            value={variable}
            onChange={(e) => setVariable(e.target.value || 'x')} // Si vide, remet 'x'
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
      <button type="submit" style={{ marginLeft: '10px' }}>Calculer</button>
      <button type="button" onClick={handleClear} style={{ marginLeft: '10px' }}>Effacer</button>
    </form>
  );
}

export default PolynomialForm;
