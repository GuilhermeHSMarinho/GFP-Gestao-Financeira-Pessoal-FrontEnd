import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa'; // Ícone de edição
import { FiTrash2 } from 'react-icons/fi'; // Ícone de lixeira
import CategoriaGF from '../../Popup/CategoriaGestaoFinanceira/CategoriaGestaoFinanceira';
import '../Configuracoes.css';

// Importa todos os ícones que podem ser usados
import {
    FaGasPump, FaShoppingCart, FaHospital, FaUtensils, FaCar, FaWallet, FaCreditCard,
    FaTaxi, FaHome, FaPiggyBank, FaBriefcase, FaGlobe, FaBook, FaMobileAlt, FaTshirt,
    FaPlane, FaLaptop, FaFilm, FaMusic, FaBicycle, FaHeartbeat, FaPrescriptionBottle,
    FaCapsules, FaClinicMedical, FaAmbulance, FaBus, FaTrain, FaParking, FaRoad,
    FaLightbulb, FaWater, FaFileInvoiceDollar, FaCashRegister, FaMoneyBillWave,
    FaMoneyCheck, FaChartLine, FaChartPie, FaCoins, FaHandHoldingUsd, FaDonate,
    FaStore, FaGift, FaSubway, FaTicketAlt, FaCamera, FaTools, FaPhone, FaFileAlt, FaCoffee
} from 'react-icons/fa';

// Mapeamento de ícones
const iconMap = {
    'fagaspump': FaGasPump, 'fashoppingcart': FaShoppingCart, 'fahospital': FaHospital,
    'fautensils': FaUtensils, 'facar': FaCar, 'fawallet': FaWallet, 'facreditcard': FaCreditCard,
    'fataxi': FaTaxi, 'fahome': FaHome, 'fapiggybank': FaPiggyBank, 'fabriefcase': FaBriefcase,
    'faglobe': FaGlobe, 'fabook': FaBook, 'famobilealt': FaMobileAlt, 'fatshirt': FaTshirt,
    'faplane': FaPlane, 'falaptop': FaLaptop, 'fafilm': FaFilm, 'famusic': FaMusic, 'fabicycle': FaBicycle,
    'faheartbeat': FaHeartbeat, 'faprescriptionbottle': FaPrescriptionBottle, 'facapsules': FaCapsules,
    'faclinicmedical': FaClinicMedical, 'faambulance': FaAmbulance, 'fabus': FaBus, 'fatrain': FaTrain,
    'faparking': FaParking, 'faroad': FaRoad, 'falightbulb': FaLightbulb, 'fawater': FaWater,
    'fafileinvoicedollar': FaFileInvoiceDollar, 'facashregister': FaCashRegister, 'famoneybillwave': FaMoneyBillWave,
    'famoneycheck': FaMoneyCheck, 'fachartline': FaChartLine, 'fachartpie': FaChartPie, 'facoins': FaCoins,
    'fahandholdingusd': FaHandHoldingUsd, 'fadonate': FaDonate, 'fastore': FaStore, 'fagift': FaGift,
    'fasubway': FaSubway, 'faticketalt': FaTicketAlt, 'facamera': FaCamera, 'fatools': FaTools, 'faphone': FaPhone,
    'fafilealt': FaFileAlt, 'facoffee': FaCoffee
};

const Categorias = ({ categorias: initialCategorias }) => {
    const [categorias, setCategorias] = useState(initialCategorias);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [categoriaEdit, setCategoriaEdit] = useState(null);

    const getContrastYIQ = (hexcolor) => {
        const r = parseInt(hexcolor.slice(1, 3), 16);
        const g = parseInt(hexcolor.slice(3, 5), 16);
        const b = parseInt(hexcolor.slice(5, 7), 16);
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 128 ? '#000000' : '#FFFFFF'; // Retorna preto ou branco
    };

    const getEditData = (categoria) => {
        return {
            nome_categoria: categoria.nome,
            cor_hexadecimal: categoria.Color_hash,
            codigo_icone: categoria.Param_Ico,
        };
    };

    const handleDelete = (id) => {
        setCategorias(categorias.filter(categoria => categoria.nome !== id)); // Remove a categoria
    };

    const handleAddCategoria = (novaCategoria) => {
        if (categoriaEdit) {
            setCategorias(categorias.map(cat => (cat.nome === novaCategoria.nome_categoria ? novaCategoria : cat)));
            setCategoriaEdit(null);
        } else {
            setCategorias([...categorias, { ...novaCategoria, id: Date.now() }]);
        }
        setIsPopupOpen(false);
    };

    useEffect(() => {
        // Logar o nome da categoria e do ícone associado no console
        categorias.forEach((categoria) => {
            const iconName = categoria.Param_Ico.toLowerCase(); // Converter para minúsculas para garantir comparação case-insensitive
            console.log(`Nome da Categoria: ${categoria.nome}, Ícone: ${iconName}`);
        });
    }, [categorias]); // O log será chamado sempre que as categorias mudarem

    return (
        <div>
            <div className="categorias-container">
                {categorias.length > 0 ? (
                    categorias.map((categoria, index) => {
                        const iconName = categoria.Param_Ico.toLowerCase(); // Garantir que o nome do ícone seja minúsculo
                        const IconComponent = iconMap[iconName]; // Acessa o componente de ícone com base no nome
                        const iconColor = categoria.Color_hash;
                        const textColor = getContrastYIQ(iconColor);

                        return (
                            <div key={index} className="categoria-card">
                                <div className="categoria-icon" style={{ backgroundColor: iconColor }}>
                                    {IconComponent ? (
                                        <IconComponent style={{ color: textColor }} />
                                    ) : (
                                        <div>Ícone não encontrado</div>
                                    )}
                                </div>
                                <div className="categoria-info">
                                    <div className="categoria-nome">{categoria.nome}</div>
                                    <div className="categoria-dados">
                                        <div className="categoria-utilizada">
                                            <div className="categoria-titulo">Já foi utilizada</div>
                                            <div className="categoria-valor">{categoria.vezesUtilizada} vezes.</div>
                                        </div>
                                        <div className="categoria-limite">
                                            <div className="categoria-titulo">Limite Mensal</div>
                                            <div className="categoria-valor">
                                                {categoria.limiteMensal ? `R$ ${categoria.limiteMensal}` : 'Não Definido'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="categoria-acoes">
                                    <div className="acao-icon editar-icone" onClick={() => {
                                        const editData = getEditData(categoria);
                                        setCategoriaEdit(editData);
                                        setIsPopupOpen(true);
                                    }}>
                                        <FaEdit />
                                    </div>
                                    <div className="acao-icon deletar-icone" onClick={() => handleDelete(categoria.nome)}>
                                        <FiTrash2 />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>Não há categorias disponíveis.</div>
                )}
            </div>

            {isPopupOpen && (
                <CategoriaGF
                    isOpen={isPopupOpen}
                    onClose={() => {
                        setIsPopupOpen(false);
                        setCategoriaEdit(null);
                    }}
                    onAddCategoria={handleAddCategoria}
                    categoriaEdit={categoriaEdit}
                />
            )}
        </div>
    );
};

export default Categorias;
