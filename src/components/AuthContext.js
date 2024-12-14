import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token'); // Ou sessionStorage
        if (storedToken) {
            setToken(storedToken); // Récupérer le token de localStorage
        }
    }, []);

    const login = (newToken) => {
        localStorage.setItem('token', newToken); // Sauvegarder le token dans localStorage
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
