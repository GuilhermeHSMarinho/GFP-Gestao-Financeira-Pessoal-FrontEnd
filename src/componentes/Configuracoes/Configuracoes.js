import React, { useState, useEffect, useContext } from 'react';
import Header from '../Header';
import './Configuracoes.css';
import CategoriaGF from '../Popup/CategoriaGestaoFinanceira/CategoriaGestaoFinanceira';
import Categorias from './Categoria/Categorias';
import Bancos from './Bancos/Bancos';
import Cartoes from './Cartoes/Cartoes';
import BancoCadastro from '../Popup/CategoriaGestaoFinanceira/BancosGestãoFinanceira';
import { AuthContext } from '../segurança/JWT/AuthContext'; // Importando o contexto de autenticação

import {
    faSpinner, faThumbsUp, faThumbsDown
} from '@fortawesome/free-solid-svg-icons';
import {
    faGasPump, faShoppingCart, faHospital, faUtensils, faCar, faWallet,
    faCreditCard, faTaxi, faHome, faPiggyBank, faBriefcase, faGlobe,
    faBook, faMobileAlt, faTshirt, faPlane, faLaptop, faFilm, faMusic,
    faBicycle, faHeartbeat, faPrescriptionBottle, faCapsules, faClinicMedical,
    faAmbulance, faBus, faTrain, faParking, faRoad, faLightbulb,
    faWater, faFileInvoiceDollar, faCashRegister, faMoneyBillWave,
    faMoneyCheck, faChartLine, faChartPie, faCoins, faHandHoldingUsd,
    faDonate, faStore, faGift, faSubway, faTicketAlt, faCamera,
    faTools, faPhone, faFileAlt, faCoffee
} from '@fortawesome/free-solid-svg-icons';

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

const Configuracoes = () => {
    const [activeDiv, setActiveDiv] = useState('');
    const [activeButton, setActiveButton] = useState('');
    const [fadeClass, setFadeClass] = useState('fade-in');

    // Estado para categorias
    const [categorias, setCategorias] = useState([]);

    // Estado para Bancos
    const [bancos, setBancos] = useState([]);

    // Estado para Cartões
    const [cartoes, setCartoes] = useState([]);

    // Estados de popup
    const [isCategoriaGFOpen, setCategoriaGFOpen] = useState(false);
    const [isBancoOpen, setBancoOpen] = useState(false);
    const [isCartaoOpen, setCartaoOpen] = useState(false);

    const { token } = useContext(AuthContext);

    // Funções para abrir e fechar popups
    const openCategoriaGF = () => setCategoriaGFOpen(true);
    const closeCategoriaGF = () => setCategoriaGFOpen(false);

    const openBancoPopup = () => setBancoOpen(true);
    const closeBancoPopup = () => setBancoOpen(false);

    const openCartaoPopup = () => setCartaoOpen(true);
    const closeCartaoPopup = () => setCartaoOpen(false);

    // Função para buscar categorias
    const fetchCategorias = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/gfp/categoria', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'HTTP_KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
                },
            });
            const data = await response.json();
            if (response.ok) {
                setCategorias(data.categorias);
            } else {
                console.error('Erro ao buscar categorias:', data);
            }
        } catch (error) {
            console.error('Erro ao chamar a API:', error);
        }
    };

    // Função para buscar bancos
    const fetchBancos = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/gfp/banco', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'HTTP_KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
                },
            });
            const data = await response.json();
            if (response.ok) {
                setBancos(data.bancos);
            } else {
                console.error('Erro ao buscar bancos:', data);
            }
        } catch (error) {
            console.error('Erro ao chamar a API:', error);
        }
    };

    useEffect(() => {
        fetchCategorias(); // Chama a função ao montar o componente
        fetchBancos(); // Chama a função para buscar os bancos
    }, [token]); // Adicionando token como dependência

    // Componentes de cada seção
    const CategoriaDiv = () => (
        <div>
            <div id="cssportal-grid-3">
                <div id="Gerenciamento-de-Categorias">Gerenciamento de Categorias</div>
                <div className="CONFGCAT">
                    <button type="button" className="cad_cat" onClick={openCategoriaGF}>
                        Cadastrar Nova Categoria
                    </button>
                    <CategoriaGF
                        isOpen={isCategoriaGFOpen}
                        onClose={closeCategoriaGF}
                    />
                </div>
                <div id="total">
                    <div className="TotalTXT">Total</div>
                    <div className="TotalEstiloBack">{categorias.length}</div>
                </div>
                <div id="conteudo">
                    <Categorias categorias={categorias} />
                </div>
            </div>
        </div>
    );

    const BancosDiv = () => (
        <div>
            <div id="cssportal-grid-3">
                <div id="Gerenciamento-de-Bancos">Gerenciamento de Bancos</div>
                <div className="CONFGCAT">
                    <button type="button" className="cad_cat" onClick={openBancoPopup}>
                        Cadastrar Novo Banco
                    </button>
                    <BancoCadastro
                        isOpen={isBancoOpen}
                        onClose={closeBancoPopup}
                        onAddBanco={(novoBanco) => setBancos((prevBancos) => [...prevBancos, novoBanco])}
                    />
                </div>
                <div id="total">
                    <div className="TotalTXT">Total</div>
                    <div className="TotalEstiloBack">{bancos.length}</div>
                </div>
                <div id="conteudo">
                    <Bancos bancos={bancos} />
                </div>
            </div>
        </div>
    );

    const CartoesDiv = () => (
        <div>
            <div id="cssportal-grid-3">
                <div id="Gerenciamento-de-Cartoes">Gerenciamento de Cartões</div>
                <div className="CONFGCAT">
                    <button type="button" className="cad_cat" onClick={openCartaoPopup}>
                        Cadastrar Novo Cartão
                    </button>
                    {/* Popup de Cartões pode ser adicionado aqui */}
                </div>
                <div id="total">
                    <div className="TotalTXT">Total</div>
                    <div className="TotalEstiloBack">{cartoes.length}</div>
                </div>
                <div id="conteudo">
                    <Cartoes cartoes={cartoes} />
                </div>
            </div>
        </div>
    );

    const renderActiveDiv = () => {
        switch (activeDiv) {
            case 'categorias':
                return <CategoriaDiv />;
            case 'bancos':
                return <BancosDiv />;
            case 'cartoes':
                return <CartoesDiv />;
            default:
                return <div>Selecione uma opção acima para configurar.</div>;
        }
    };

    return (
        <div className="container">
            <Header />
            <main>
                <div id="cssportal-grid">
                    <div id="botoes">
                        <div id="cssportal-grid-2">
                            <div id="NomeConfiguraçoes">
                                <div id="NomeConfiguraTXT">Configurações</div>
                            </div>
                            <div id="Botoes" className="vertical-buttons">
                                <button
                                    onClick={() => {
                                        setActiveDiv('categorias');
                                        setActiveButton('categorias');
                                        setFadeClass('fade-in');
                                    }}
                                    type="button"
                                    className={activeButton === 'categorias' ? 'active' : ''}
                                >
                                    Categorias
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveDiv('bancos');
                                        setActiveButton('bancos');
                                        setFadeClass('fade-in');
                                    }}
                                    type="button"
                                    className={activeButton === 'bancos' ? 'active' : ''}
                                >
                                    Bancos
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveDiv('cartoes');
                                        setActiveButton('cartoes');
                                        setFadeClass('fade-in');
                                    }}
                                    type="button"
                                    className={activeButton === 'cartoes' ? 'active' : ''}
                                >
                                    Cartões
                                </button>
                            </div>
                            <div id="Redefinir">
                                <button type="reset">Redefinir</button>
                            </div>
                        </div>
                    </div>
                    <div id="interface-configuracoes" className={fadeClass}>
                        {renderActiveDiv()}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Configuracoes;