import React, { useState } from 'react';
import './Dashboard.css';
import Header from './Header';
import MenuInvest from './Popup/MenuInvestimentos/MenuInvest'; // Importe o novo componente
import RVGFPopupInvestimento from './Popup/CadastroDeRendaVariavel/RendaVariavel';

const Dashboard = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Estado para controlar o popup

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const openPopup = () => {
        setIsPopupOpen(true); // Abre o popup
    };

    const closePopup = () => {
        setIsPopupOpen(false); // Fecha o popup
    };

    return (
        <div className="container">
            <Header />
            <button type="button" onClick={toggleExpansion} className="button">
                {isExpanded ? 'Fechar' : 'Expandir'}
            </button>
            <MenuInvest
                isExpanded={isExpanded}
                toggleExpansion={toggleExpansion}
                openPopup={openPopup}
            />
            {isPopupOpen && <RVGFPopupInvestimento isOpen={isPopupOpen} onClose={closePopup} />} {/* Renderiza o Popup */}
        </div>
    );
};

export default Dashboard;
