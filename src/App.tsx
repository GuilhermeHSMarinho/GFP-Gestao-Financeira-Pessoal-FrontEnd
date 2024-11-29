import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/segurança/login'; // Componente de Login
import Dashboard from './componentes/Dashboard'; // Componente de Dashboard
import Configuracoes from './componentes/Configuracoes/Configuracoes'; // Componente de Configurações
import CG from './componentes/CalendarioDeGastos/CG'; // Componente CG
import { AuthProvider } from './componentes/segurança/JWT/AuthContext'; // Importando o AuthProvider
import PrivateRoute from './componentes/segurança/PrivateRoute/PrivateRoute';
import InvestimentosDASH from "./componentes/Investimentos/DashBoard_Investimentos"; // Ajuste no nome do componente
import Lancamentos from './componentes/Lancamentos/lancamentos'; // Componente de Lançamentos
import Relatorios from './componentes/Relatorios/Relatorios'; // Componente de Relatórios
import LimiteGastos from './componentes/LimiteDeGastos/LimiteDeGastos'; // Componente de Limite de Gastos

function App() {
    return (
        <AuthProvider> {/* Envolvendo as rotas com AuthProvider */}
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/configuracoes"
                        element={
                            <PrivateRoute>
                                <Configuracoes />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/investimentos"
                        element={
                            <PrivateRoute>
                                <InvestimentosDASH />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/cg"
                        element={
                            <PrivateRoute>
                                <CG />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/lancamentos"
                        element={
                            <PrivateRoute>
                                <Lancamentos />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/relatorios"
                        element={
                            <PrivateRoute>
                                <Relatorios />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/limite-gastos"
                        element={
                            <PrivateRoute>
                                <LimiteGastos />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
