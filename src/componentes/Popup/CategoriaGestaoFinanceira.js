import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SliderPicker } from 'react-color';
import './CategoriaGestãoFinanceira.css';
import {
    faGasPump, faShoppingCart, faHospital, faUtensils, faCar, faWallet, faCreditCard, faTaxi, faHome, faPiggyBank,
    faBriefcase, faGlobe, faBook, faMobileAlt, faTshirt, faPlane, faLaptop, faFilm, faMusic, faBicycle,
    faHeartbeat, faPrescriptionBottle, faCapsules, faClinicMedical, faAmbulance, faBus, faTrain, faParking, faRoad,
    faLightbulb, faWater, faFileInvoiceDollar, faCashRegister, faMoneyBillWave, faMoneyCheck, faChartLine, faChartPie,
    faCoins, faHandHoldingUsd, faDonate, faStore, faGift, faSubway, faTicketAlt, faCamera, faTools, faPhone, faFileAlt, faCoffee
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
};

const CategoriaGF = ({ isOpen, onClose }) => {
    const [categoryName, setCategoryName] = useState('');
    const [selectedColor, setSelectedColor] = useState('#fff');
    const [tempColor, setTempColor] = useState('#fff');
    const [selectedIcon, setSelectedIcon] = useState('');

    // Referência para o conteúdo do pop-up
    const popupRef = useRef(null);

    // Fechar o pop-up ao clicar fora dele
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        // Adiciona o listener para cliques
        document.addEventListener('mousedown', handleClickOutside);

        // Limpa o listener ao desmontar
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    // Adicione um retorno cedo para evitar a execução do restante do componente
    if (!isOpen) return null;

    const handleIconSelect = (iconName) => {
        setSelectedIcon(iconName);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Nome da categoria:', categoryName);
        console.log('Cor selecionada (HEX):', selectedColor);
        console.log('Ícone selecionado:', selectedIcon);
        onClose();
    };

    const handleColorChange = (color) => {
        setTempColor(color.hex);
    };

    const handleColorChangeComplete = (color) => {
        setSelectedColor(color.hex);
    };

    return (
        <div className="popup">
            <div className="popup-content" ref={popupRef}>
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Cadastro de Categoria</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Nome da Categoria:</label>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Selecione uma Cor:</label>
                        <SliderPicker
                            color={tempColor}
                            onChange={handleColorChange}
                            onChangeComplete={handleColorChangeComplete}
                        />
                        <br />
                        <div className="color-display" style={{ backgroundColor: selectedColor }}>
                            {selectedIcon && <FontAwesomeIcon icon={iconMap[selectedIcon]} size="2x" color="#fff" />}
                        </div>
                    </div>

                    <div>
                        <br />
                        <label>Selecione um Ícone:</label>
                        <div className="icon-grid">
                            {Object.keys(iconMap).map((iconName) => (
                                <div key={iconName} className="icon-item" onClick={() => handleIconSelect(iconName)}>
                                    <FontAwesomeIcon icon={iconMap[iconName]} size="2x" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="button-container">
                        <button className="cancel-btn" type="button" onClick={onClose}>Cancelar</button>
                        <button className="submit-btn" type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoriaGF;
