import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SliderPicker } from 'react-color';
import './CategoriaGestãoFinanceira.css';
import {
    faGasPump, faShoppingCart, faHospital, faUtensils, faCar, faWallet, faCreditCard, faTaxi, faHome, faPiggyBank,
    faBriefcase, faGlobe, faBook, faMobileAlt, faTshirt, faPlane, faLaptop, faFilm, faMusic, faBicycle,
    faHeartbeat, faPrescriptionBottle, faCapsules, faClinicMedical, faAmbulance, faBus, faTrain, faParking, faRoad,
    faLightbulb, faWater, faFileInvoiceDollar, faCashRegister, faMoneyBillWave, faMoneyCheck, faChartLine, faChartPie,
    faCoins, faHandHoldingUsd, faDonate, faStore, faGift, faSubway, faTicketAlt, faCamera, faTools, faPhone, faFileAlt, faCoffee,
    faThumbsUp, faThumbsDown, faSpinner // Importando ícones adicionais
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
    faSpinner // Importando o ícone de carregamento
};

const CategoriaGF = ({ isOpen, onClose }) => {
    const [categoryName, setCategoryName] = useState('');
    const [selectedColor, setSelectedColor] = useState('#fff');
    const [tempColor, setTempColor] = useState('#fff');
    const [selectedIcon, setSelectedIcon] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    // Referência para o conteúdo do pop-up
    const popupRef = useRef(null);

    // Fechar o pop-up ao clicar fora dele
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

    // Adicione um retorno cedo para evitar a execução do restante do componente
    if (!isOpen) return null;

    const handleIconSelect = (iconName) => {
        setSelectedIcon(iconName);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        const data = {
            name: categoryName,
            color: selectedColor,
            icon: selectedIcon // JSON que será enviado
        };

        console.log('Dados a serem enviados:', data); // Verificando os dados a serem enviados

        try {
            const response = await fetch('https://sua-api-url.com/categorias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Falha ao cadastrar a categoria');
            }

            // Se a resposta for bem-sucedida, mostramos o joinha para cima
            setSuccess(true);
        } catch (err) {
            // Em caso de erro, mostramos o joinha para baixo
            setError(true);
        } finally {
            setLoading(false);
            setTimeout(() => {
                onClose(); // Fecha o pop-up após 3 segundos
            }, 3000);
        }
    };

    const handleColorChange = (color) => {
        setTempColor(color.hex);
    };

    const handleColorChangeComplete = (color) => {
        setSelectedColor(color.hex);
    };

    return (
        <div className="popupCatGF">
            <div className="popup-contentCatGF" ref={popupRef}>
                <span className="closeCatGF" onClick={onClose}>&times;</span>
                <h2>Cadastro de Categoria</h2>
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

                    <div>
                        <label>Selecione uma Cor:</label>
                        <SliderPicker
                            color={tempColor}
                            onChange={handleColorChange}
                            onChangeComplete={handleColorChangeComplete}
                        />
                        <br />
                        <div className="color-displayCatGF" style={{ backgroundColor: selectedColor }}>
                            {selectedIcon && <FontAwesomeIcon icon={iconMap[selectedIcon]} size="2x" color="#fff" />}
                        </div>
                    </div>

                    <div>
                        <br />
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
                            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Cadastrar'}
                        </button>
                    </div>
                </form>

                {loading && <div className="loading-messageCatGF">Enviando...</div>}

                {/* Ícone de sucesso ou erro centralizado e sobrepondo o pop-up */}
                {(success || error) && (
                    <div className="overlay-iconCatGF">
                        <FontAwesomeIcon icon={success ? faThumbsUp : faThumbsDown} size="4x" color="#000" />
                        <div className="feedback-messageCatGF">
                            {success ? 'Cadastro realizado com sucesso!' : 'Falha ao cadastrar!'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoriaGF;
