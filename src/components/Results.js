// src/components/Results.js
import React from 'react';

function Results({ result, error }) {
  return (
    <div className="results">
      {error && <p className="error">{error}</p>}

      {result && (
        <>
          <h2>Résultats</h2>
          <p><strong>Simplified Expression:</strong> {result.simplifiedExpression}</p>
          <p><strong>Factored Expression:</strong> {result.factoredExpression}</p>
          <p><strong>Racines:</strong></p>
          <ul>
            {result.roots.map((root, index) => (
              <li key={index}>{root}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Results;
