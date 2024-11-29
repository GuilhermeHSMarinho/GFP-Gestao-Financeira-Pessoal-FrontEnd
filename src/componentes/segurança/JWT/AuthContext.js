import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState(null); // Armazenar o nome do usuário

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserName = localStorage.getItem('userName');
        if (storedToken) {
            setToken(storedToken);
        }
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    const login = (jwtToken, nomeUsuario) => {
        setToken(jwtToken);
        setUserName(nomeUsuario); // Armazena o nome do usuário
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('userName', nomeUsuario); // Armazena o nome do usuário no localStorage
    };

    const logout = () => {
        setToken(null);
        setUserName(null); // Remove o nome do usuário
        localStorage.removeItem('token');
        localStorage.removeItem('userName'); // Remove o nome do usuário do localStorage
    };

    return (
        <AuthContext.Provider value={{ token, userName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
