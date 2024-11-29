// Header.js
import React, { useState, useRef, useEffect, useContext } from 'react'; // Importando useContext
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
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
import { AuthContext } from './segurança/JWT/AuthContext'; // Importando o AuthContext

const Header = () => {
    const [showNumbers, setShowNumbers] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const mainRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { userName } = useContext(AuthContext); // Obtendo o nome do usuário do AuthContext

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

    const navigateToPage = (path) => {
        if (location.pathname === path) {
            window.alert("Você já está nesta página!");
        } else {
            navigate(path);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuOpen && !event.target.closest('.burger-menu')) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <header className="header-container">
            <div className="header-left">
                <img src={profile} alt="Ícone de Login" className="iconprofile" />
                <span className="username">{userName ? userName : 'Erro ao carregar o nome!!'}</span> {/* Exibindo o nome do usuário */}
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
                    <button type="button" onClick={() => navigateToPage('/dashboard')}>
                        <img src={IconHouse} alt="Ícone de Visão Geral" className="iconbuttons" /> Visão Geral
                    </button>
                    <button type="button" onClick={() => navigateToPage('/cg')}>
                        <img src={iconCalendar} alt="Ícone de Calendário" className="iconbuttons" /> Calendário de Gastos
                    </button>
                    <button type="button" onClick={() => navigateToPage('/lancamentos')}>
                        <img src={icontasksquare} alt="Ícone de Lançamentos" className="iconbuttons" /> Lançamentos
                    </button>
                    <button type="button" onClick={() => navigateToPage('/relatorios')}>
                        <img src={iconbill} alt="Ícone de Relatórios" className="iconbuttons" /> Relatórios
                    </button>
                    <button type="button" onClick={() => navigateToPage('/limite-gastos')}>
                        <img src={iconclok} alt="Ícone de Limite de Gastos" className="iconbuttons" /> Limite de Gastos
                    </button>
                    <button type="button" onClick={() => navigateToPage('/investimentos')}>
                        <img src={iconwallet} alt="Ícone de Investimentos" className="iconbuttons" /> Investimentos
                    </button>
                    <button type="button" onClick={() => navigateToPage('/configuracoes')}>
                        <img src={iconsetting} alt="Ícone de Configurações" className="iconbuttons" /> Configurações
                    </button>
                </div>
                <div className="logout-button">
                    <button onClick={handleLogout} className="logout">Sair</button>
                </div>
            </div>

            {menuOpen && (
                <div className="burger-menu">
                    <button type="button" onClick={() => navigateToPage('/dashboard')}>
                        <img src={IconHouse} alt="Ícone de Visão Geral" className="iconbuttons" /> Visão Geral
                    </button>
                    <button type="button" onClick={() => navigateToPage('/cg')}>
                        <img src={iconCalendar} alt="Ícone de Calendário" className="iconbuttons" /> Calendário de Gastos
                    </button>
                    <button type="button" onClick={() => navigateToPage('/lancamentos')}>
                        <img src={icontasksquare} alt="Ícone de Lançamentos" className="iconbuttons" /> Lançamentos
                    </button>
                    <button type="button" onClick={() => navigateToPage('/relatorios')}>
                        <img src={iconbill} alt="Ícone de Relatórios" className="iconbuttons" /> Relatórios
                    </button>
                    <button type="button" onClick={() => navigateToPage('/limite-gastos')}>
                        <img src={iconclok} alt="Ícone de Limite de Gastos" className="iconbuttons" /> Limite de Gastos
                    </button>
                    <button type="button" onClick={() => navigateToPage('/investimentos')}>
                        <img src={iconwallet} alt="Ícone de Investimentos" className="iconbuttons" /> Investimentos
                    </button>
                    <button type="button" onClick={() => navigateToPage('/configuracoes')}>
                        <img src={iconsetting} alt="Ícone de Configurações" className="iconbuttons" /> Configurações
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
