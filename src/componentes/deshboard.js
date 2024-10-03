import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './deshboard.css';
import profile from "./profile.svg";
import IconHouse from "./Icones/dashboard/house.svg";
import iconCalendar from "./Icones/dashboard/calendar.svg";
import icontasksquare from "./Icones/dashboard/task-square.svg";
import iconbill from "./Icones/dashboard/bill.svg";
import iconclok from "./Icones/dashboard/timer-start.svg";
import iconwallet from "./Icones/dashboard/wallet-3.svg";
import iconsetting from "./Icones/dashboard/setting-2.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faBars } from '@fortawesome/free-solid-svg-icons';
import CategoriaGF from './Popup/CategoriaGestaoFinanceira';

const Dashboard = () => {
    const [showNumbers, setShowNumbers] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isCategoriaGFOpen, setIsCategoriaGFOpen] = useState(false);
    const mainRef = useRef(null);
    const navigate = useNavigate();

    const toggleNumbersInElement = (element, hideNumbers) => {
        element.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                if (hideNumbers) {
                    node.textContent = node.textContent.replace(/\d/g, '*');
                } else {
                    node.textContent = node.textContent.replace(/\*{2,}/g, '1234');
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                toggleNumbersInElement(node, hideNumbers);
            }
        });
    };

    const toggleShowNumbers = () => {
        setShowNumbers(!showNumbers);
        const mainDiv = mainRef.current;
        if (mainDiv) {
            toggleNumbersInElement(mainDiv, showNumbers);
        }
    };

    const handleLogout = () => {
        window.location.href = "/";
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const openCategoriaGF = () => {
        setIsCategoriaGFOpen(true);
    };

    const closeCategoriaGF = () => {
        setIsCategoriaGFOpen(false);
    };

    const goToConfiguracoes = () => {
        navigate('/configuracoes');
    };

    // Função para fechar o menu se clicar fora dele
    const handleClickOutside = (event) => {
        if (menuOpen && mainRef.current && !mainRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    // useEffect para adicionar e limpar o manipulador de eventos
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]); // Executa novamente quando menuOpen mudar

    return (
        <div className="dashboard-container">
            <header>
                <div className="header-left">
                    <img src={profile} alt="Ícone de Login" className="iconprofile" />
                    <span className="username">Guilherme Marinho</span>
                    <FontAwesomeIcon
                        icon={showNumbers ? faEyeSlash : faEye}
                        className="eye-icon"
                        onClick={toggleShowNumbers}
                    />
                </div>

                <div className="header-right">
                    <div className="hamburger-button" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faBars} className="burger-icon" />
                    </div>
                    <div className="botoes_menu">
                        <button type="submit"><img src={IconHouse} alt="Ícone de Visão Geral" className="iconbuttons" /> Visão Geral</button>
                        <button type="submit"><img src={iconCalendar} alt="Ícone de Calendário" className="iconbuttons" /> Calendario de Gastos</button>
                        <button type="submit"><img src={icontasksquare} alt="Ícone de Lançamentos" className="iconbuttons" /> Lançamentos</button>
                        <button type="submit"><img src={iconbill} alt="Ícone de Relatórios" className="iconbuttons" /> Relatórios</button>
                        <button type="submit"><img src={iconclok} alt="Ícone de Limite de Gastos" className="iconbuttons" /> Limite de Gastos</button>
                        <button type="submit"><img src={iconwallet} alt="Ícone de Investimentos" className="iconbuttons" /> Investimentos</button>
                        <button type="submit" onClick={goToConfiguracoes}><img src={iconsetting} alt="Ícone de Configurações" className="iconbuttons" /> Configurações</button>
                    </div>
                    <div className="logout-button">
                        <button onClick={handleLogout} className="logout">Sair</button>
                    </div>
                </div>
            </header>

            {menuOpen && (
                <div className="burger-menu">
                    <button type="button"><img src={IconHouse} alt="Ícone de Visão Geral" className="iconbuttons" /> Visão Geral</button>
                    <button type="button"><img src={iconCalendar} alt="Ícone de Calendário" className="iconbuttons" /> Calendario de Gastos</button>
                    <button type="button"><img src={icontasksquare} alt="Ícone de Lançamentos" className="iconbuttons" /> Lançamentos</button>
                    <button type="button"><img src={iconbill} alt="Ícone de Relatórios" className="iconbuttons" /> Relatórios</button>
                    <button type="button"><img src={iconclok} alt="Ícone de Limite de Gastos" className="iconbuttons" /> Limite de Gastos</button>
                    <button type="button"><img src={iconwallet} alt="Ícone de Investimentos" className="iconbuttons" /> Investimentos</button>
                    <button type="button" onClick={goToConfiguracoes}><img src={iconsetting} alt="Ícone de Configurações" className="iconbuttons" /> Configurações</button>
                </div>
            )}

            <div className="Main" ref={mainRef}>
                <div id="cssportal-grid">
                    <div id="NomeAcessoRapido">NomeAcessoRapido</div>
                    <div id="NomeUsuario">
                        <button type="button" onClick={openCategoriaGF}>
                            teste
                        </button>
                        <CategoriaGF isOpen={isCategoriaGFOpen} onClose={closeCategoriaGF} />
                    </div>
                    <div id="NomeLimitedeGastos">NomeLimitedeGastos</div>
                    <div id="Datas">Datas</div>
                    <div id="GraficoReceita">GraficoReceita</div>
                    <div id="GraficoDespesa">GraficoDespesa</div>
                    <div id="DadosDeContasAPagar">DadosDeContasAPagar</div>
                    <div id="NomeMeusBancos">NomeMeusBancos</div>
                    <div id="NomeMeusCartoes">NomeMeusCartoes</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
