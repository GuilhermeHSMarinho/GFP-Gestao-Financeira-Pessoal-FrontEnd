import React, { useState, useRef, useEffect, useContext } from 'react';
import { SliderPicker } from 'react-color';
import './BancoCadastro.css';
import { AuthContext } from '../../segurança/JWT/AuthContext';
import {
    FaMoneyBillWave, FaCreditCard, FaBuilding, FaCheckCircle, FaTimes
} from 'react-icons/fa'; // Importando ícones do react-icons
import {
    faSpinner, faThumbsUp, faThumbsDown
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Mapeamento de ícones
const iconMap = {
    'Banco': <FaBuilding size={24} />,
    'Cartão de Crédito': <FaCreditCard size={24} />,
    'Dinheiro': <FaMoneyBillWave size={24} />,
    'Sucesso': <FaCheckCircle size={24} />
};

const BancoCadastro = ({ isOpen, onClose, onAddBanco, bancoEdit }) => {
    const [bancoNome, setBancoNome] = useState('');
    const [selectedColor, setSelectedColor] = useState('#fff');
    const [tempColor, setTempColor] = useState('#fff');
    const [selectedIcon, setSelectedIcon] = useState('');
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
        if (bancoEdit) {
            setBancoNome(bancoEdit.nome_banco);
            setSelectedColor(bancoEdit.cor_hexadecimal);
            setTempColor(bancoEdit.cor_hexadecimal);
            setSelectedIcon(bancoEdit.codigo_icone);
        } else {
            setBancoNome('');
            setSelectedColor('#fff');
            setTempColor('#fff');
            setSelectedIcon('');
        }
    }, [bancoEdit]);

    const handleIconSelect = (iconName) => {
        setSelectedIcon(iconName);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        const data = {
            nome_banco: bancoNome,
            cor_hexadecimal: selectedColor,
            codigo_icone: selectedIcon,
        };

        console.log('Dados a serem enviados:', JSON.stringify(data, null, 2));

        try {
            if (bancoEdit) {
                await editBanco(data);
            } else {
                await createBanco(data);
            }
            onAddBanco({ ...data });
            setSuccess(true);
        } catch (err) {
            console.error('Erro:', err);
            setError(true);
        } finally {
            setLoading(false);
            setTimeout(() => {
                onClose();
            }, 3000);
        }
    };

    const createBanco = async (data) => {
        const response = await fetch('http://localhost:5000/api/gfp/banco/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'HTTP_KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Falha ao cadastrar o banco');
        }
    };

    const editBanco = async (data) => {
        const response = await fetch(`http://localhost:5000/api/banco/editar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'HTTP_KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Falha ao editar o banco');
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
            <div className="popupBancoCadastro">
                <div className="popup-contentBancoCadastro" ref={popupRef}>
                    <span className="closeBancoCadastro" onClick={onClose}>
                        <FaTimes />
                    </span>
                    <h2>{bancoEdit ? 'Editar Banco' : 'Cadastro de Banco'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-groupBancoCadastro">
                            <label>Nome do Banco:</label>
                            <input
                                type="text"
                                value={bancoNome}
                                onChange={(e) => setBancoNome(e.target.value)}
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
                            <div className="color-displayBancoCadastro" style={{ backgroundColor: selectedColor }}>
                                {selectedIcon && iconMap[selectedIcon]} {/* Usando o ícone selecionado */}
                            </div>
                        </div>

                        <div>
                            <label>Selecione um Ícone:</label>
                            <div className="icon-gridBancoCadastro">
                                {Object.keys(iconMap).map((iconName) => (
                                    <div key={iconName} className="icon-itemBancoCadastro" onClick={() => handleIconSelect(iconName)}>
                                        {iconMap[iconName]}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="button-containerBancoCadastro">
                            <button className="cancel-btnBancoCadastro buttonBancoCadastro" type="button" onClick={onClose}>Cancelar</button>
                            <button className="submit-btnBancoCadastro buttonBancoCadastro" type="submit" disabled={loading}>
                                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : (bancoEdit ? 'Atualizar' : 'Cadastrar')}
                            </button>
                        </div>
                    </form>

                    {loading && <div className="loading-messageBancoCadastro">Enviando...</div>}

                    {(success || error) && (
                        <div className="overlay-iconBancoCadastro">
                            <FontAwesomeIcon icon={success ? faThumbsUp : faThumbsDown} size="4x" color="#000" />
                            <p>{success ? 'Banco cadastrado com sucesso!' : 'Erro ao cadastrar o banco.'}</p>
                        </div>
                    )}
                </div>
            </div>
        ) : null
    );
};

export default BancoCadastro;
