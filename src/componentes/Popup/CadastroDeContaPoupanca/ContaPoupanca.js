// src/Popup/CadastroContaCorrente/ContaCorrentePopup.js
import React, { useState, useRef, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NumericFormat } from 'react-number-format';
import './contaPoupanca.css';
import {
    faThumbsUp,
    faThumbsDown,
    faSpinner,
    faSearch,
    faMoneyBillWave,
    faCalendar,
    faPen // Ícone para descrição do investimento
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../segurança/JWT/AuthContext'; // Importe o contexto de autenticação

const ContaPoupancaPopup = ({ isOpen, onClose }) => {
    const { token } = useContext(AuthContext);
    const [banco, setBanco] = useState('');
    const [descricaoInvestimento, setDescricaoInvestimento] = useState('');
    const [valorInvestido, setValorInvestido] = useState('');
    const [dataInvestimento, setDataInvestimento] = useState('');
    const [rentavel, setRentavel] = useState(0);
    const [percentualCDI, setPercentualCDI] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [bancosFiltrados, setBancosFiltrados] = useState([]);

    const popupRef = useRef(null);

    // Fechar popup ao clicar fora
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

    // Buscar bancos
    useEffect(() => {
        const fetchBancos = async (termo) => {
            if (termo.length < 1) {
                setBancosFiltrados([]);
                return;
            }
            try {
                const response = await fetch(`http://localhost:5000/api/gdi/banco/consultar/${termo}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (data.bancos) {
                    setBancosFiltrados(data.bancos.map(banco => banco.nome));
                } else {
                    setBancosFiltrados([]);
                }
            } catch (err) {
                console.error('Erro ao buscar bancos:', err);
            }
        };

        fetchBancos(banco);
    }, [banco, token]);

    // Submeter o formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        const data = {
            nome_banco: banco.trim(),
            descricao_investimento: descricaoInvestimento.trim(),
            valor_investido: Number(valorInvestido.replace(/\./g, '').replace(',', '.')).toFixed(2),
            data_investimento: dataInvestimento,
            rentavel: rentavel,
            tipo_conta: "poupanca", // Alterado para "poupanca"
            taxa_rendimento: rentavel === 1 ? percentualCDI : null
        };

        try {
            const response = await fetch('http://localhost:5000/api/gdi/conta_bancaria/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Falha ao cadastrar o investimento');
            }

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

    return (
        <div className="popupContaPoupanca">
            <div className="popup-contentContaPoupanca" ref={popupRef}>
                <span className="closeContaPoupanca" onClick={onClose}>&times;</span>
                <h2>Cadastro de Poupança</h2> {/* Alterado para Poupança */}
                <form onSubmit={handleSubmit}>
                    <div className="input-groupContaPoupanca">
                        <label>Banco:</label>
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faSearch} className="input-icon" />
                            <input
                                type="text"
                                list="bancos"
                                value={banco}
                                onChange={(e) => setBanco(e.target.value)}
                                required
                            />
                        </div>
                        <datalist id="bancos">
                            {bancosFiltrados.map((item, index) => (
                                <option key={index} value={item} />
                            ))}
                        </datalist>
                    </div>

                    <div className="input-groupContaPoupanca">
                        <label>Descrição do Investimento:</label>
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faPen} className="input-icon" />
                            <input
                                type="text"
                                value={descricaoInvestimento}
                                onChange={(e) => setDescricaoInvestimento(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-groupContaPoupanca">
                        <label>Valor Investido:</label>
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faMoneyBillWave} className="input-icon" />
                            <NumericFormat
                                value={valorInvestido}
                                onValueChange={(values) => setValorInvestido(values.value)}
                                thousandSeparator="."
                                decimalSeparator=","
                                prefix="R$ "
                                decimalScale={2}
                                fixedDecimalScale
                                isNumericString
                                required
                            />
                        </div>
                    </div>

                    <div className="input-groupContaPoupanca">
                        <label>Data do Investimento:</label>
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faCalendar} className="input-icon" />
                            <input
                                type="date"
                                value={dataInvestimento}
                                onChange={(e) => setDataInvestimento(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-groupContaPoupanca">
                        <label>Rentável:</label>
                        <div className="toggle-switch">
                            <input
                                type="checkbox"
                                id="toggleRentavel"
                                checked={rentavel === 1}
                                onChange={() => {
                                    setRentavel(prev => (prev === 1 ? 0 : 1));
                                    if (rentavel === 1) setPercentualCDI(''); // Limpa percentual quando não é mais rentável
                                }}
                            />
                            <label htmlFor="toggleRentavel" className="switch-label">
                                <span className="switch-button" />
                                <span className="switch-text">{rentavel === 1 ? '' : ''}</span>
                            </label>
                        </div>
                    </div>

                    {rentavel === 1 && (
                        <div className="input-groupContaPoupanca">
                            <label>Qual percentual do CDI?</label>
                            <div className="input-with-icon">
                                <FontAwesomeIcon icon={faMoneyBillWave} className="input-icon" />
                                <input
                                    type="number"
                                    value={percentualCDI}
                                    onChange={(e) => setPercentualCDI(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="button-containerContaPoupanca">
                        <button className="cancel-btnContaPoupanca" type="button" onClick={onClose}>Cancelar</button>
                        <button className="submit-btnContaPoupanca" type="submit" disabled={loading}>
                            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Cadastrar'}
                        </button>
                    </div>
                </form>

                {loading && <div className="loading-messageContaPoupanca">Enviando...</div>}

                {(success || error) && (
                    <div className="overlay-iconContaPoupanca">
                        <FontAwesomeIcon icon={success ? faThumbsUp : faThumbsDown} size="4x" color="#000" />
                        <div className="feedback-messageContaPoupanca">
                            {success ? 'Cadastro realizado com sucesso!' : 'Falha ao cadastrar!'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContaPoupancaPopup; // Alterado para ContaPoupancaPopup
