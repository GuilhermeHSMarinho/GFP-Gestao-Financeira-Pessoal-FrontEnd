import React, { useEffect, useRef, useState } from 'react';
import './MenuInvest.css';
import RVGFPopupInvestimento from '../../Popup/CadastroDeRendaVariavel/RendaVariavel';
import CFPPopupCadastroDeFundosEPrevidencia from '../../Popup/CadastroDeFundosEPrevidência/CadastroDeFundosEPrevidência';
import GFPRFPopupRendaFixa from '../../Popup/CadastroDeRendaFixa/CadastroDeRendaFixa';
import TesouroDiretoPopup from '../../Popup/CadastroTesouroDireto/TesouroDireto';
import CadastroCriptomoedaPopup from '../../Popup/CadastroDeCriptomoedas/criptomoeda';
import ContaCorrentePopup from '../../Popup/CadastroDeContaCorrente/ContaCorrente'; // Importação do popup de Conta Corrente
import ContaPoupancaPopup from '../../Popup/CadastroDeContaPoupanca/ContaPoupanca'; // Importação do popup de Conta Poupança
import Cript from '../../Icones/MenuInvestimentos/Criptomoeda.svg';
import Deriv from '../../Icones/MenuInvestimentos/Derivativos.svg';
import fundEPrev from '../../Icones/MenuInvestimentos/Fundos e Previdência.svg';
import moeda from '../../Icones/MenuInvestimentos/Moeda.svg';
import person from '../../Icones/MenuInvestimentos/Personalizado.svg';
import poupan from '../../Icones/MenuInvestimentos/Poupança.svg';
import rendFixa from '../../Icones/MenuInvestimentos/Renda Fixa.svg';
import rendVariavel from '../../Icones/MenuInvestimentos/Renda Variável.svg';
import TesouroDireto from '../../Icones/MenuInvestimentos/Tesouro Direto.svg';
import ContaCorrente from '../../Icones/MenuInvestimentos/Conta Corrente.svg';

const MenuInvest = ({ isExpanded, toggleExpansion }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isFundosPopupOpen, setIsFundosPopupOpen] = useState(false);
    const [isRendaFixaPopupOpen, setIsRendaFixaPopupOpen] = useState(false);
    const [isTesouroPopupOpen, setIsTesouroPopupOpen] = useState(false);
    const [isMoedaPopupOpen, setIsMoedaPopupOpen] = useState(false);
    const [isContaCorrentePopupOpen, setIsContaCorrentePopupOpen] = useState(false); // Estado para o popup de Conta Corrente
    const [isContaPoupancaPopupOpen, setIsContaPoupancaPopupOpen] = useState(false); // Estado para o popup de Conta Poupança
    const panelRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                toggleExpansion();
            }
        };

        if (isExpanded) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isExpanded, toggleExpansion]);

    // Funções para abrir e fechar os popups
    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const openFundosPopup = () => {
        setIsFundosPopupOpen(true);
    };

    const closeFundosPopup = () => {
        setIsFundosPopupOpen(false);
    };

    const openRendaFixaPopup = () => {
        setIsRendaFixaPopupOpen(true);
    };

    const closeRendaFixaPopup = () => {
        setIsRendaFixaPopupOpen(false);
    };

    const openTesouroPopup = () => {
        setIsTesouroPopupOpen(true);
    };

    const closeTesouroPopup = () => {
        setIsTesouroPopupOpen(false);
    };

    const openMoedaPopup = () => {
        setIsMoedaPopupOpen(true);
    };

    const closeMoedaPopup = () => {
        setIsMoedaPopupOpen(false);
    };

    const openContaCorrentePopup = () => { // Função para abrir o popup de Conta Corrente
        setIsContaCorrentePopupOpen(true);
    };

    const closeContaCorrentePopup = () => { // Função para fechar o popup de Conta Corrente
        setIsContaCorrentePopupOpen(false);
    };

    const openContaPoupancaPopup = () => { // Função para abrir o popup de Conta Poupança
        setIsContaPoupancaPopupOpen(true);
    };

    const closeContaPoupancaPopup = () => { // Função para fechar o popup de Conta Poupança
        setIsContaPoupancaPopupOpen(false);
    };

    return (
        <>
            <div className={`side-panel ${isExpanded ? 'expanded' : ''}`} ref={panelRef}>
                {isExpanded && (
                    <div className="side-panel-content">
                        <button className="close-button" onClick={toggleExpansion}>
                            &times;
                        </button>
                        <div>
                            <h2 className="colortext">Cadastro de Investimentos</h2>
                            <br />
                            <div className="GridEspacamento">
                                <div id="cssportal-grid-Menu-Ativos">
                                    <div id="RendaVariavel" onClick={openPopup} style={{ cursor: 'pointer' }}>
                                        <img src={rendVariavel} alt="Ícone de Renda Variável" className="iconbuttons" />
                                        <br />
                                        Renda Variável
                                    </div>
                                    <div id="FundosePrevidencia" onClick={openFundosPopup} style={{ cursor: 'pointer' }}>
                                        <img src={fundEPrev} alt="Ícone de Fundos e Previdência" className="iconbuttons" />
                                        <br />
                                        Fundos de Previdência
                                    </div>
                                    <div id="RendaFixa" onClick={openRendaFixaPopup} style={{ cursor: 'pointer' }}>
                                        <img src={rendFixa} alt="Ícone de Renda Fixa" className="iconbuttons" />
                                        <br />
                                        Renda Fixa
                                    </div>
                                    <div id="TesouroDireto" onClick={openTesouroPopup} style={{ cursor: 'pointer' }}>
                                        <img src={TesouroDireto} alt="Ícone de Tesouro Direto" className="iconbuttons" />
                                        <br />
                                        Tesouro Direto
                                    </div>
                                    <div id="Moeda" onClick={openMoedaPopup} style={{ cursor: 'pointer' }}>
                                        <img src={moeda} alt="Ícone de Moeda" className="iconbuttons" />
                                        <br />
                                        Moeda
                                    </div>
                                    <div id="Criptomoeda" onClick={openMoedaPopup} style={{ cursor: 'pointer' }}>
                                        <img src={Cript} alt="Ícone de Criptomoeda" className="iconbuttons" />
                                        <br />
                                        Criptomoeda
                                    </div>
                                    <div id="ContaCorrente" onClick={openContaCorrentePopup} style={{ cursor: 'pointer' }}>
                                        <img src={ContaCorrente} alt="Ícone de Conta Corrente" className="iconbuttons" />
                                        <br />
                                        Conta Corrente
                                    </div>
                                    <div id="Poupança" onClick={openContaPoupancaPopup} style={{ cursor: 'pointer' }}>
                                        <img src={poupan} alt="Ícone de Poupança" className="iconbuttons" />
                                        <br />
                                        Poupança
                                    </div>
                                    <div id="Derivativos">
                                        <img src={Deriv} alt="Ícone de Derivativos" className="iconbuttons" />
                                        <br />
                                        Derivativos
                                    </div>
                                    <div id="Personalizado">
                                        <img src={person} alt="Ícone de Personalizado" className="iconbuttons" />
                                        <br />
                                        Personalizado
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Renderiza os popups */}
            {isPopupOpen && <RVGFPopupInvestimento isOpen={isPopupOpen} onClose={closePopup} />}
            {isFundosPopupOpen && <CFPPopupCadastroDeFundosEPrevidencia isOpen={isFundosPopupOpen} onClose={closeFundosPopup} />}
            {isRendaFixaPopupOpen && <GFPRFPopupRendaFixa isOpen={isRendaFixaPopupOpen} onClose={closeRendaFixaPopup} />}
            {isTesouroPopupOpen && <TesouroDiretoPopup isOpen={isTesouroPopupOpen} onClose={closeTesouroPopup} />}
            {isMoedaPopupOpen && <CadastroCriptomoedaPopup isOpen={isMoedaPopupOpen} onClose={closeMoedaPopup} />}
            {isContaCorrentePopupOpen && <ContaCorrentePopup isOpen={isContaCorrentePopupOpen} onClose={closeContaCorrentePopup} />}
            {isContaPoupancaPopupOpen && <ContaPoupancaPopup isOpen={isContaPoupancaPopupOpen} onClose={closeContaPoupancaPopup} />}
        </>
    );
};

export default MenuInvest;
