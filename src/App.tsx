// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/segurança/login'; // Importa o componente de Login
import Dashboard from './componentes/deshboard'; // Importa o componente de Dashboard

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> {}
                <Route path="/dashboard" element={<Dashboard />} /> {}
            </Routes>
        </Router>
    );
}

export default App;
