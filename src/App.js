import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';  // Importer le AuthProvider
import Login from './components/LoginForm';
import Register from './components/Register';
import ForgotPassword from './components/Forgot-password';
import PolynomialForm from './components/PolynomialForm'; // Assurez-vous d'importer PolynomialForm
import History from './components/History';
import Profile from './components/Profile';
import CalculatorCrud from './components/CalculatorCrud';
import UserPolynomials from "./components/UserPolynomials"; // Nouveau composant pour les polynômes
const App = () => {
    return (
        <AuthProvider> {/* Envelopper l'application avec le provider pour accéder au contexte */}
            <Router>
   
                    <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/manage-calculators" element={<CalculatorCrud />} />
                    <Route path="/user/:userId" element={<UserPolynomials />} />

                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/polynomial-form" element={<PolynomialForm />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/history" element={<History />} />

                    </Routes>
            </Router>
        </AuthProvider> // Fermer le provider ici
    );
};

export default App;
