import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the welcome message', () => {
  render(<App />);
  
  // Adaptez le texte recherché à ce qui est affiché dans le DOM
  const linkElement = screen.getByText(/welcome back/i);
  expect(linkElement).toBeInTheDocument();
});
