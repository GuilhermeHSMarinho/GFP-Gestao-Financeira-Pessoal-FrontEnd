// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/segurança/login'; // Importa o componente de Login
import Dashboard from './componentes/deshboard'; // Importa o componente de Dashboard
import Configuracoes from "./componentes/Configuracoes/Configuracoes"; // Importa o componente de Configurações

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/configuracoes" element={<Configuracoes />} />
            </Routes>
        </Router>
    );
}

export default App;
