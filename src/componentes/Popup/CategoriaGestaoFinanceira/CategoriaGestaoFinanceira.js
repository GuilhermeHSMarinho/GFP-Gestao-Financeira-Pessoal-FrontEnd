import React, { useState, useRef, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SliderPicker } from 'react-color';
import './CategoriaGestãoFinanceira.css';
import { AuthContext } from '../../segurança/JWT/AuthContext';
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

const CategoriaGF = ({ isOpen, onClose, onAddCategoria, categoriaEdit }) => {
    const [categoryName, setCategoryName] = useState('');
    const [selectedColor, setSelectedColor] = useState('#fff');
    const [tempColor, setTempColor] = useState('#fff');
    const [selectedIcon, setSelectedIcon] = useState('');
    const [limiteMensal, setLimiteMensal] = useState(''); // Estado para o limite mensal
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const { token } = useContext(AuthContext);
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    useEffect(() => {
        if (categoriaEdit) {
            setCategoryName(categoriaEdit.nome_categoria);
            setSelectedColor(categoriaEdit.cor_hexadecimal);
            setTempColor(categoriaEdit.cor_hexadecimal);
            setSelectedIcon(categoriaEdit.codigo_icone);
            setLimiteMensal(categoriaEdit.limiteMensal); // Preenche limite mensal se estiver editando
        } else {
            setCategoryName('');
            setSelectedColor('#fff');
            setTempColor('#fff');
            setSelectedIcon('');
            setLimiteMensal(''); // Limpa limite mensal
        }
    }, [categoriaEdit]);

    const handleIconSelect = (iconName) => {
        setSelectedIcon(iconName);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        // Se limiteMensal estiver vazio, definimos como null
        const limiteMensalValue = limiteMensal.trim() === '' ? null : limiteMensal;

        const data = {
            nome_categoria: categoryName,
            cor_hexadecimal: selectedColor,
            codigo_icone: selectedIcon,
            limiteMensal: limiteMensalValue,
            nome_categoria_antiga: categoriaEdit ? categoriaEdit.nome_categoria : null,
            nome_categoria_nova: categoriaEdit ? categoryName : null,
            cor_hexadecimal_nova: categoriaEdit ? selectedColor : null,
            codigo_icone_novo: categoriaEdit ? selectedIcon : null,
            limiteMensal_novo: categoriaEdit ? limiteMensalValue : null
        };

        // Adicionando o console.log para verificar o JSON
        console.log('Dados a serem enviados:', JSON.stringify(data, null, 2));

        try {
            if (categoriaEdit) {
                await editCategory(data);
            } else {
                await createCategory(data);
            }
            onAddCategoria(data);
            setSuccess(true);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
            setTimeout(() => {
                onClose();
            }, 3000);
        }
    };

    const createCategory = async (data) => {
        const response = await fetch('http://localhost:5000/api/gfp/categoria/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'HTTP_KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
            },
            body: JSON.stringify({
                nome_categoria: data.nome_categoria,
                cor_hexadecimal: data.cor_hexadecimal,
                codigo_icone: data.codigo_icone,
                limiteMensal: data.limiteMensal
            }),
        });

        if (!response.ok) {
            throw new Error('Falha ao cadastrar a categoria');
        }
    };

    const editCategory = async (data) => {
        const response = await fetch('http://localhost:5000/api/gfp/categoria/atualizar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'HTTP_KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
            },
            body: JSON.stringify({
                nome_categoria_antiga: data.nome_categoria_antiga,
                nome_categoria_nova: data.nome_categoria_nova,
                cor_hexadecimal_nova: data.cor_hexadecimal_nova,
                codigo_icone_novo: data.codigo_icone_novo,
                limiteMensal_novo: data.limiteMensal_novo
            }),
        });

        if (!response.ok) {
            throw new Error('Falha ao editar a categoria');
        }
    };

    const handleColorChange = (color) => {
        setTempColor(color.hex);
    };

    const handleColorChangeComplete = (color) => {
        setSelectedColor(color.hex);
    };

    return (
        isOpen ? (
            <div className="popupCatGF">
                <div className="popup-contentCatGF" ref={popupRef}>
                    <span className="closeCatGF" onClick={onClose}>&times;</span>
                    <h2>{categoriaEdit ? 'Editar Categoria' : 'Cadastro de Categoria'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-groupCGFCatGF">
                            <label>Nome da Categoria:</label>
                            <input
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-groupCGFCatGF">
                            <label>Limite Mensal:</label>
                            <input
                                type="text"
                                value={limiteMensal}
                                onChange={(e) => setLimiteMensal(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Selecione uma Cor:</label>
                            <SliderPicker
                                color={tempColor}
                                onChange={handleColorChange}
                                onChangeComplete={handleColorChangeComplete}
                            />
                            <div className="color-displayCatGF" style={{ backgroundColor: selectedColor }}>
                                {selectedIcon && <FontAwesomeIcon icon={iconMap[selectedIcon]} size="2x" color="#fff" />}
                            </div>
                        </div>
                        <div>
                            <label>Selecione um Ícone:</label>
                            <div className="icon-gridCatGF">
                                {Object.keys(iconMap).map((iconName) => (
                                    <div key={iconName} className="icon-itemCatGF" onClick={() => handleIconSelect(iconName)}>
                                        <FontAwesomeIcon icon={iconMap[iconName]} size="2x" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="button-containerCatGF">
                            <button className="cancel-btnCatGF buttonCatGestFinace" type="button" onClick={onClose}>Cancelar</button>
                            <button className="submit-btnCatGF buttonCatGestFinace" type="submit" disabled={loading}>
                                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : (categoriaEdit ? 'Atualizar' : 'Cadastrar')}
                            </button>
                        </div>
                    </form>
                    {loading && <div className="loading-messageCatGF">Enviando...</div>}
                    {(success || error) && (
                        <div className="overlay-iconCatGF">
                            <FontAwesomeIcon icon={success ? faThumbsUp : faThumbsDown} size="4x" color="#000" />
                            <p>{success ? 'Categoria cadastrada com sucesso!' : 'Erro ao cadastrar a categoria.'}</p>
                        </div>
                    )}
                </div>
            </div>
        ) : null
    );
};

export default CategoriaGF;
