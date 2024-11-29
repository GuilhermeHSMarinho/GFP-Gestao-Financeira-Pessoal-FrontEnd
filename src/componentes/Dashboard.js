import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css';
import Header from './Header';

import svgDespesa from "./Icones/dashboard/SVGDespesa.svg";
import svgReceita from "./Icones/dashboard/SVGReceita.svg";
import svgImports from "./Icones/dashboard/SVGImports.svg";
import svgTransferencias from "./Icones/dashboard/SVGTransferencias.svg";
import { AuthContext } from "./segurança/JWT/AuthContext";

// Importe o componente do popup (CadastroReceita e CadastroDespesa)
import CadastroReceita from './Popup/CadastroReceita/CadReceita'; // Ajuste o caminho conforme necessário
import CadastroDespesa from './Popup/CadastroDespesa/CadDespesa'; // Ajuste o caminho conforme necessário

const Dashboard = () => {
    const [greeting, setGreeting] = useState("Olá");
    const { userName, token } = useContext(AuthContext); // Obtém o nome de usuário e token
    const [receita, setReceita] = useState("R$ 0,00");
    const [despesa, setDespesa] = useState("R$ 0,00");

    // Controle do estado dos popups
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupDespesaOpen, setIsPopupDespesaOpen] = useState(false);

    useEffect(() => {
        const hours = new Date().getHours();
        const isDayTime = hours >= 6 && hours < 18;
        setGreeting(isDayTime ? "Bom dia" : "Boa noite");
    }, []);

    useEffect(() => {
        const fetchFinanceData = async () => {
            if (!token) {
                console.error("Token não encontrado!");
                return;
            }

            try {
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho de autorização
                };

                // Requisição para buscar a receita
                const receitaResponse = await axios.get(
                    'http://localhost:5000/api/gfp/receita/mes-ano/11/2024',
                    { headers }
                );
                setReceita(receitaResponse.data.total_receitas || "R$ 0,00");

                // Requisição para buscar a despesa
                const despesaResponse = await axios.get(
                    'http://localhost:5000/api/gfp/despesa/mes-ano/11/2024',
                    { headers }
                );
                setDespesa(despesaResponse.data.total_despesas || "R$ 0,00");

            } catch (error) {
                console.error("Erro ao buscar os dados financeiros:", error);
            }
        };

        fetchFinanceData();
    }, [token]); // O useEffect depende do token
di
    // Funções para abrir e fechar os popups
    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);
    const openPopupDespesa = () => setIsPopupDespesaOpen(true);
    const closePopupDespesa = () => setIsPopupDespesaOpen(false);

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.cssPortalGrid}>
                <div className={styles.DASH_main}>
                    <div className={styles.cssportalgridMainMain2}>
                        <div className={styles.MainMain2}>
                            <div className={styles.cssportalgridMain02}>
                                <div className={styles.MainBlankBlank1}></div>
                                <div className={styles.MainBlankBlank2}></div>
                                <div className={styles.MainReceita}>
                                    <div className={styles.cssportalgridRDR}>
                                        <div className={styles.CardMainRDR}>
                                            <div className={styles.cssportalgridInter}>
                                                <div className={styles.CardInterTitle}>
                                                    <span className={styles.linkButton}>Receita Mensal</span>
                                                </div>
                                                <div className={styles.CardInterConteudo}>
                                                    <p className={styles.colorReceitaMain}>{receita}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.MainDespesa}>
                                    <div className={styles.cssportalgridRDR}>
                                        <div className={styles.CardMainRDR}>
                                            <div className={styles.cssportalgridInter}>
                                                <div className={styles.CardInterTitle}>Despesa Mensal</div>
                                                <div className={styles.CardInterConteudo}>
                                                    <p className={styles.colorDespesaMain}>{despesa}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.MainMain1}>
                            <p>
                                <div className={styles.usernameMainBody}>{greeting},</div>
                                {userName}!
                            </p>
                        </div>
                        <div className={styles.MainMain3}>
                            <div className={styles.cssportalgridMainMainMain}>
                                <div className={styles.MainMainMainTitle2}>Acesso Rápido</div>
                                <div className={styles.MainMainMainButtons}>
                                    <div className={styles.cssportalgridMainMainButtons}>
                                        <div className={styles.MianMianButton1}>
                                            <div onClick={openPopupDespesa} className={styles.MainMainCaxinha}>
                                                <img src={svgDespesa} alt="Ícone de Despesa" className={styles.iconbuttons} />
                                                Despesa
                                            </div>
                                        </div>
                                        <div className={styles.MianMianButton2}>
                                            <div onClick={openPopup} className={styles.MainMainCaxinha}>
                                                <img src={svgReceita} alt="Ícone de Receita" className={styles.iconbuttons} />
                                                Receita
                                            </div>
                                        </div>
                                        <div className={styles.MianMianButton3}>
                                            <div className={styles.MainMainCaxinha}>
                                                <img src={svgImports} alt="Ícone de Importar" className={styles.iconbuttons} />
                                                Importar
                                            </div>
                                        </div>
                                        <div className={styles.MianMianButton4}>
                                            <div className={styles.MainMainCaxinha}>
                                                <img src={svgTransferencias} alt="Ícone de Transferência" className={styles.iconbuttons} />
                                                Transferência
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.DASH_Grafic_Limit_Gast}>DASH_Grafic_Limit_Gast</div>
                <div className={styles.DASH_Grafic_receita}>DASH_Grafic_receita</div>
                <div className={styles.DASH_Grafic_despesa}>DASH_Grafic_despesa</div>
                <div className={styles.DASH_List_Minhas_Contas}>DASH_List_Minhas_Contas</div>
                <div className={styles.DASH_List_Meus_Cartoes}>DASH_List_Meus_Cartoes</div>
                <div className={styles.DASH_List_Contas_A_Pagar}>DASH_List_Contas_A_Pagar</div>
                <div className={styles.DASH_List_Financas_Pessoal}>DASH_List_Financas_Pessoal</div>
            </div>

            {/* Popup de cadastro de receita */}
            {isPopupOpen && <CadastroReceita onClose={closePopup} />}

            {/* Popup de cadastro de despesa */}
            {isPopupDespesaOpen && <CadastroDespesa onClose={closePopupDespesa} />}
        </div>
    );
};

export default Dashboard;
