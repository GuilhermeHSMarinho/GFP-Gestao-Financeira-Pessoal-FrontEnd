import React, { useState } from 'react';
import styles from './DashBoard_Investimentos.module.css'; // Importando estilos
import Header from "../Header";

// Importando os ícones
import AtivosINV from "./Icones_DASH/AtivosINV.svg";
import CarteiraINV from "./Icones_DASH/CarteiraINV.svg";
import HistoricoINV from "./Icones_DASH/HistoricoINV.svg";
import ObjetivosINV from "./Icones_DASH/ObjetivosINV.svg";
import RelatoriosINV from "./Icones_DASH/RelatorioINV.svg";

// Importando os componentes
import AtivoINVC from "./Content_Body/AtivosINV";
import CarteiraINVC from "./Content_Body/CarteiraINV";
import HistoricoINVC from "./Content_Body/HistoricoINV";
import ObjetivosINVC from "./Content_Body/ObjetivosINV";
import RelatoriosINVC from "./Content_Body/RelatoriosINV";

const InvestimentosDASH = () => {
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.cssportalGrid}>
                <div className={styles.contentMain}>
                    <div className={styles.cssportalgrid2}>
                        <div className={styles.contentTitleWelcome}>
                            <div className={styles.TitleWelcome}>Bem-Vindo</div>
                            <br />
                            <div className={styles.subtitleWelcome}>à sua Carteira de Investimentos!</div>
                        </div>
                        <div className={styles.contentTitleControlPanel}>
                            Painel de Controle
                        </div>
                        <div className={`${styles.contentButtonCarteira} ${activeButton === 'Carteiras' ? styles.activeButton : ''}`}>
                            <button
                                type="button"
                                onClick={() => handleButtonClick('Carteiras')}
                            >
                                <img src={CarteiraINV} alt="Carteira Icon" className={styles.icon} />
                                Carteiras
                            </button>
                        </div>
                        <div className={`${styles.contentButtonObjetivos} ${activeButton === 'Objetivos' ? styles.activeButton : ''}`}>
                            <button
                                type="button"
                                onClick={() => handleButtonClick('Objetivos')}
                            >
                                <img src={ObjetivosINV} alt="Objetivos Icon" className={styles.icon} />
                                Objetivos
                            </button>
                        </div>
                        <div className={`${styles.contentButtonAtivos} ${activeButton === 'Ativos' ? styles.activeButton : ''}`}>
                            <button
                                type="button"
                                onClick={() => handleButtonClick('Ativos')}
                            >
                                <img src={AtivosINV} alt="Ativos Icon" className={styles.icon} />
                                Ativos
                            </button>
                        </div>
                        <div className={`${styles.contentButtonHistorico} ${activeButton === 'Historico' ? styles.activeButton : ''}`}>
                            <button
                                type="button"
                                onClick={() => handleButtonClick('Historico')}
                            >
                                <img src={HistoricoINV} alt="Historico Icon" className={styles.icon} />
                                Historico
                            </button>
                        </div>
                        <div className={`${styles.contentButtonRelatorios} ${activeButton === 'Relatorios' ? styles.activeButton : ''}`}>
                            <button
                                type="button"
                                onClick={() => handleButtonClick('Relatorios')}
                            >
                                <img src={RelatoriosINV} alt="Relatorios Icon" className={styles.icon} />
                                Relatorios
                            </button>
                        </div>
                        <div className={styles.contentTitleCarteira}>
                            Carteira
                        </div>
                        <div className={styles.contentBlank}></div>
                        <div className={styles.contentTitleIndicadores}>
                            Indicadores
                        </div>
                    </div>
                </div>
                <div className={styles.contentBody}>
                    {activeButton === 'Carteiras' && <CarteiraINVC />}
                    {activeButton === 'Objetivos' && <ObjetivosINVC />}
                    {activeButton === 'Ativos' && <AtivoINVC />}
                    {activeButton === 'Historico' && <HistoricoINVC />}
                    {activeButton === 'Relatorios' && <RelatoriosINVC />}
                    {!activeButton && "Content_Body"}
                </div>
            </div>
        </div>
    );
}

export default InvestimentosDASH;
