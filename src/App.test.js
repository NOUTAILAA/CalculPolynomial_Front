import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './components/AuthContext';
import { act } from 'react-dom/test-utils';

describe('Login Component', () => {
  test('renders the welcome message', async () => {
    await act(async () => {
      render(
        <AuthProvider>
          <App />
        </AuthProvider>
      );
    });

    const linkElement = screen.getByText(/welcome back/i);
    expect(linkElement).toBeInTheDocument();  // Vérification avec jest-dom
  });
});
