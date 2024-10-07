import React from 'react';
import './MenuInvest.css';
import RVGFPopupInvestimento from '../../Popup/CadastroDeRendaVariavel/RendaVariavel'; // Ajuste o caminho se necessário

const MenuInvest = ({ isExpanded, toggleExpansion, openPopup }) => (
    <div className={`side-panel ${isExpanded ? 'expanded' : ''}`}>
        {isExpanded && (
            <div className="side-panel-content">
                <button className="close-button" onClick={toggleExpansion}>
                    &times; {/* "X" para fechar */}
                </button>
                <div>
                    <h2>Cadastro de Renda Variavel</h2>
                    <br />
                    <div className="GridEspacamento">
                        <div id="cssportal-grid-Menu-Ativos">
                            <div id="RendaVariavel" onClick={openPopup} style={{ cursor: 'pointer' }}>

                                Renda Variável
                            </div>
                            <div id="FundosePrevidencia">Fundos de Previdência</div>
                            <div id="RendaFixa">Renda Fixa</div>
                            <div id="TesouroDireto">Tesouro Direto</div>
                            <div id="Moeda">Moeda</div>
                            <div id="Criptomoeda">Criptomoeda</div>
                            <div id="ContaCorrente">Conta Corrente</div>
                            <div id="Poupança">Poupança</div>
                            <div id="Derivativos">Derivativos</div>
                            <div id="Personalizado">Personalizado</div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
);

export default MenuInvest;
