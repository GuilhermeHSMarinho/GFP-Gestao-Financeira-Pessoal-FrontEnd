import React from 'react';
import './deshboard.css';
import profile from "./profile.svg";
import IconHouse from "./Icones/dashboard/house.svg";
import iconCalendar from "./Icones/dashboard/calendar.svg";
import icontasksquare from "./Icones/dashboard/task-square.svg";
import iconbill from "./Icones/dashboard/bill.svg";
import iconclok from "./Icones/dashboard/timer-start.svg";
import iconwallet from "./Icones/dashboard/wallet-3.svg";
import iconsetting from "./Icones/dashboard/setting-2.svg";

const Dashboard = () => {
    const handleLogout = () => {
        // Redireciona o usuário para a página de login (ajuste conforme o seu roteamento)
        window.location.href = "/";
    };

    return (
        <div className="dashboard-container">
            <header>
                <div className="header-left">
                    <img src={profile} alt="Ícone de Login" className="iconprofile" />
                    <span className="username">Guilherme Marinho</span>
                </div>

                <div className="botoes_menu">
                    <button type="submit"><img src={IconHouse} alt="Ícone de Visão Geral" className="iconbuttons" /> Visão Geral</button>
                    <button type="submit"><img src={iconCalendar} alt="Ícone de Calendário" className="iconbuttons" /> Calendario de Gastos</button>
                    <button type="submit"><img src={icontasksquare} alt="Ícone de Lançamentos" className="iconbuttons" /> Lançamentos</button>
                    <button type="submit"><img src={iconbill} alt="Ícone de Relatórios" className="iconbuttons" /> Relatórios</button>
                    <button type="submit"><img src={iconclok} alt="Ícone de Limite de Gastos" className="iconbuttons" /> Limite de Gastos</button>
                    <button type="submit"><img src={iconwallet} alt="Ícone de Investimentos" className="iconbuttons" /> Investimentos</button>
                    <button type="submit"><img src={iconsetting} alt="Ícone de Configurações" className="iconbuttons" /> Configurações</button>
                </div>

                {/* Botão Sair no canto direito */}
                <div className="logout-button">
                    <button onClick={handleLogout} className="logout">Sair</button>
                </div>
            </header>
        </div>
    );
}

export default Dashboard;
