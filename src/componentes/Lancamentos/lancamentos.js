import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGasPump, faShoppingCart, faHospital, faUtensils, faCar, faWallet,
    faCreditCard, faTaxi, faHome, faPiggyBank, faBriefcase, faGlobe,
    faBook, faMobileAlt, faTshirt, faPlane, faLaptop, faFilm, faMusic,
    faBicycle, faHeartbeat, faPrescriptionBottle, faCapsules, faClinicMedical,
    faAmbulance, faBus, faTrain, faParking, faRoad, faLightbulb,
    faWater, faFileInvoiceDollar, faCashRegister, faMoneyBillWave,
    faMoneyCheck, faChartLine, faChartPie, faCoins, faHandHoldingUsd,
    faDonate, faStore, faGift, faSubway, faTicketAlt, faCamera,
    faTools, faPhone, faFileAlt, faCoffee, faThumbsUp, faThumbsDown, faSpinner
} from '@fortawesome/free-solid-svg-icons';

import styles from './lancamentos.module.css';
import Header from "../Header";

// Mapeamento de ícones
const iconMap = {
    faGasPump,
    faShoppingCart,
    faHospital,
    faUtensils,
    faCar,
    faWallet,
    faCreditCard,
    faTaxi,
    faHome,
    faPiggyBank,
    faBriefcase,
    faGlobe,
    faBook,
    faMobileAlt,
    faTshirt,
    faPlane,
    faLaptop,
    faFilm,
    faMusic,
    faBicycle,
    faHeartbeat,
    faPrescriptionBottle,
    faCapsules,
    faClinicMedical,
    faAmbulance,
    faBus,
    faTrain,
    faParking,
    faRoad,
    faLightbulb,
    faWater,
    faFileInvoiceDollar,
    faCashRegister,
    faMoneyBillWave,
    faMoneyCheck,
    faChartLine,
    faChartPie,
    faCoins,
    faHandHoldingUsd,
    faDonate,
    faStore,
    faGift,
    faSubway,
    faTicketAlt,
    faCamera,
    faTools,
    faPhone,
    faFileAlt,
    faCoffee,
    faThumbsUp,
    faThumbsDown,
    faSpinner
};

// JSON de exemplo com dados dos lançamentos
const lancamentosData = [
    {
        valor: "R$ 200,00",
        data: "2024-11-10",
        banco: "Banco do Brasil",
        categoria: "Alimentação",
        nomeConta: "Conta Corrente",
        ico: "faUtensils" // Ícone para alimentação
    },
    {
        valor: "R$ 1500,00",
        data: "2024-11-05",
        banco: "Caixa Econômica",
        categoria: "Salário",
        nomeConta: "Conta Poupança",
        ico: "faBriefcase" // Ícone para salário
    },
    {
        valor: "R$ 120,00",
        data: "2024-11-07",
        banco: "Bradesco",
        categoria: "Transporte",
        nomeConta: "Conta Corrente",
        ico: "faCar" // Ícone para transporte
    },
    {
        valor: "R$ 50,00",
        data: "2024-11-12",
        banco: "Santander",
        categoria: "Lazer",
        nomeConta: "Conta Digital",
        ico: "faCoffee" // Ícone para lazer
    }
];

// Componente de card individual para cada lançamento
const CardLancamento = ({ valor, data, banco, categoria, nomeConta, ico }) => {
    return (
        <div className={styles.LancamentoMain02BodyCard}>
            <div className={styles.LancamentoMain02BodyValorCard}>{valor}</div>
            <div className={styles.LancamentoMain02BodydataCard}>{data}</div>
            <div className={styles.LancamentoMain02BodyBancosCard}>{banco}</div>
            <div className={styles.LancamentoMain02BodyCategoriasCard}>{categoria}</div>
            <div className={styles.LancamentoMain02BodyNomeContaCard}>{nomeConta}</div>
            <div className={styles.LancamentoMain02BodyIcoCard}>
                <FontAwesomeIcon icon={iconMap[ico]} /> {/* Renderizando o ícone com base no nome */}
            </div>
        </div>
    );
};

// Componente principal de lançamentos que mapeia e renderiza os cards
const Lancamentos = () => {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.LancamentoMain}>
                <div className={styles.LancamentoMain01}>
                    <div className={styles.LancamentoMain01Body}>
                        <div className={styles.LancamentoMain01BodyTXTBody}>LancamentoMain01BodyTXTBody</div>
                        <div className={styles.LancamentoMain01BodyCMBFiltro}>LancamentoMain01BodyCMBFiltro</div>
                        <div className={styles.LancamentoMain01BodyCalendario}>
                            <div className={styles.LancamentoMain01BodyCalendariobody}>
                                <div
                                    className={styles.LancamentoMain01BodyCalendarioAno}>Ano
                                </div>
                                <div
                                    className={styles.LancamentoMain01BodyCalendarioMes01}>Mes01
                                </div>
                                <div
                                    className={styles.LancamentoMain01BodyCalendarioMes02}>Mes02
                                </div>
                                <div
                                    className={styles.LancamentoMain01BodyCalendarioMes03}>Mes03
                                </div>
                                <div
                                    className={styles.LancamentoMain01BodyCalendarioMes04}>Mes04
                                </div>
                                <div
                                    className={styles.LancamentoMain01BodyCalendarioMes05}>Mes05
                                </div>
                                <div
                                    className={styles.LancamentoMain01BodyCalendarioMes06}>Mes06
                                </div>
                                <div
                                    className={styles.LancamentoMain01BodyCalendarioMes07}>Mes07
                                </div>
                                <div
                                    className={styles.LancamentoMain01BodyCalendarioMes08}>Mes08
                                </div>
                                <div
                                    className={styles.LancamentoMain01BodyCalendarioMes09}>Mes09
                                </div>
                                <div
                                    className={styles.LancamentoMain01BodyCalendarioMes10}>Mes10
                                </div>
                                <div
                                    className={styles.LancamentoMain01BodyCalendarioMes11}>Mes11
                                </div>
                                <div
                                    className={styles.LancamentoMain01BodyCalendarioMes12}>Mes12
                                </div>
                            </div>
                        </div>
                        <div className={styles.LancamentoMain01Bodyblank}></div>
                        <div className={styles.LancamentoMain01BodyBTNDespesa}>LancamentoMain01BodyBTNDespesa</div>
                        <div className={styles.LancamentoMain01BodyBTNReceita}>LancamentoMain01BodyBTNReceita</div>
                    </div>
                </div>
                <div className={styles.LancamentoMain02}>
                    <div className={styles.LancamentoMain02Body}>
                        <div className={styles.LancamentoMain02BodyBlank01}></div>
                        <div className={styles.LancamentoMain02BodyBlank02}></div>
                        <div className={styles.LancamentoMain02BodyContent}>
                            <div className={`${styles.LancamentoMain02BodyCard} ${styles.noHover}`}>
                                <div className={styles.LancamentoMain02BodyValorCard}
                                     style={{fontWeight: 'bold'}}>Valor
                                </div>
                                <div className={styles.LancamentoMain02BodydataCard} style={{fontWeight: 'bold'}}>Data
                                </div>
                                <div className={styles.LancamentoMain02BodyBancosCard}
                                     style={{fontWeight: 'bold'}}>Banco
                                </div>
                                <div className={styles.LancamentoMain02BodyCategoriasCard}
                                     style={{fontWeight: 'bold'}}>Categorias
                                </div>
                                <div className={styles.LancamentoMain02BodyNomeContaCard}
                                     style={{fontWeight: 'bold'}}>Nome da conta
                                </div>
                                <div className={styles.LancamentoMain02BodyIcoCard} style={{fontWeight: 'bold'}}></div>
                            </div>

                            {lancamentosData.map((lancamento, index) => (
                                <CardLancamento
                                    key={index}
                                    valor={lancamento.valor}
                                    data={lancamento.data}
                                    banco={lancamento.banco}
                                    categoria={lancamento.categoria}
                                    nomeConta={lancamento.nomeConta}
                                    ico={lancamento.ico} // Nome do ícone
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lancamentos;
