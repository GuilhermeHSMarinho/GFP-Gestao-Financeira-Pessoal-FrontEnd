// PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../JWT/AuthContext'; // Ajuste o caminho conforme necessário

const PrivateRoute = ({ children }) => {
    const { token } = useContext(AuthContext);

    return token ? children : <Navigate to="/" replace />; // Redireciona para a página de login
};

export default PrivateRoute;
