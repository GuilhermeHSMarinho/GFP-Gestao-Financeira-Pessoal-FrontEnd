// src/Popup/CadastroMoeda/CadastroMoedaPopup.js
import React, { useState, useRef, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NumericFormat } from 'react-number-format';
import './Moeda.css';
import { faThumbsUp, faThumbsDown, faSpinner, faSearch, faCalendar, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../segurança/JWT/AuthContext'; // Importe o contexto de autenticação

const CadastroMoedaPopup = ({ isOpen, onClose }) => {
    const { token } = useContext(AuthContext); // Acesse o token do contexto de autenticação
    const [corretora, setCorretora] = useState('');
    const [moedaInvestida, setMoedaInvestida] = useState('');
    const [valorInvestido, setValorInvestido] = useState('');
    const [cotacao, setCotacao] = useState('');
    const [dataInvestimento, setDataInvestimento] = useState('');
    const [moedasFiltradas, setMoedasFiltradas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [corretorasFiltradas, setCorretorasFiltradas] = useState([]);
    const [selectedCorretoraError, setSelectedCorretoraError] = useState(false);

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

    // Buscar corretoras
    useEffect(() => {
        const fetchCorretoras = async (termo) => {
            if (termo.length < 1) {
                setCorretorasFiltradas([]);
                return;
            }
            try {
                const response = await fetch(`http://localhost:5000/api/gdi/corretora/consultar/${termo}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'HTTP-KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (data.corretoras) {
                    setCorretorasFiltradas(data.corretoras);
                } else {
                    setCorretorasFiltradas([]);
                }
            } catch (err) {
                console.error('Erro ao buscar corretoras:', err);
            }
        };

        fetchCorretoras(corretora);
    }, [corretora, token]);

    // Buscar moedas
    useEffect(() => {
        const fetchMoedas = async (termo) => {
            if (termo.length < 1) {
                setMoedasFiltradas([]);
                return;
            }
            try {
                const response = await fetch(`http://localhost:5000/api/gdi/moedas/consultar/${termo}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'HTTP-KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (data.moedas) {
                    const moedasFormatadas = data.moedas.map(moeda => `${moeda.codigo} : ${moeda.nome}`);
                    setMoedasFiltradas(moedasFormatadas);
                } else {
                    setMoedasFiltradas([]);
                }
            } catch (err) {
                console.error('Erro ao buscar moedas:', err);
            }
        };

        fetchMoedas(moedaInvestida);
    }, [moedaInvestida, token]);

    // Submeter o formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);
        setSelectedCorretoraError(false);

        // Verifica se a corretora selecionada está nas corretoras filtradas
        if (!corretorasFiltradas.includes(corretora)) {
            setSelectedCorretoraError(true);
            setLoading(false);
            return;
        }

        const data = {
            nome_corretora: corretora.trim(),
            moeda_investida: moedaInvestida.trim(),
            cotacao: Number(cotacao).toFixed(2),
            valor_investido: Number(valorInvestido.replace(/\./g, '').replace(',', '.')).toFixed(2),
            data_investimento: dataInvestimento,
        };

        try {
            const response = await fetch('http://localhost:5000/api/gdi/moeda/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'HTTP-KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
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
        <div className="popupMGFP">
            <div className="popup-contentMGFP" ref={popupRef}>
                <span className="closeMGFP" onClick={onClose}>&times;</span>
                <h2>Cadastro de Moeda</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-groupMGFP">
                        <label>Corretora:</label>
                        <div className="input-with-icon espacamentoIcon">
                            <FontAwesomeIcon icon={faSearch} className="input-icon" />
                            <input
                                type="text"
                                list="corretoras"
                                value={corretora}
                                onChange={(e) => setCorretora(e.target.value)}
                                required
                            />
                        </div>
                        <datalist id="corretoras">
                            {corretorasFiltradas.map((item, index) => (
                                <option key={index} value={item} />
                            ))}
                        </datalist>
                        {selectedCorretoraError && <div className="error-message">Selecione uma corretora válida da lista.</div>}
                    </div>

                    <div className="input-groupMGFP">
                        <label>Moeda Investida:</label>
                        <div className="input-with-icon espacamentoIcon">
                            <FontAwesomeIcon icon={faSearch} className="input-icon" />
                            <input
                                type="text"
                                list="moedas"
                                value={moedaInvestida}
                                onChange={(e) => setMoedaInvestida(e.target.value)}
                                required
                            />
                        </div>
                        <datalist id="moedas">
                            {moedasFiltradas.map((item, index) => (
                                <option key={index} value={item} />
                            ))}
                        </datalist>
                    </div>

                    <div className="input-groupMGFP">
                        <label>Cotação da Moeda:</label>
                        <div className="input-with-icon espacamentoIcon">
                            <FontAwesomeIcon icon={faMoneyBillWave} className="input-icon" />
                            <NumericFormat
                                value={cotacao}
                                onValueChange={(values) => setCotacao(values.value)}
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

                    <div className="input-groupMGFP">
                        <label>Valor Investido:</label>
                        <div className="input-with-icon espacamentoIcon">
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

                    <div className="input-groupMGFP">
                        <label>Data do Investimento:</label>
                        <div className="input-with-icon espacamentoIcon">
                            <FontAwesomeIcon icon={faCalendar} className="input-icon" />
                            <input
                                type="date"
                                value={dataInvestimento}
                                onChange={(e) => setDataInvestimento(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {success && (
                        <div className="overlay-iconMGFP">
                            <FontAwesomeIcon icon={faThumbsUp} size="4x" color="#48bb78" />
                            <div className="feedback-messageMGFP">Investimento registrado com sucesso!</div>
                        </div>
                    )}

                    {error && (
                        <div className="overlay-iconMGFP">
                            <FontAwesomeIcon icon={faThumbsDown} size="4x" color="#e53e3e" />
                            <div className="feedback-messageMGFP">Erro ao registrar investimento.</div>
                        </div>
                    )}

                    {loading && (
                        <div className="overlay-iconMGFP">
                            <FontAwesomeIcon icon={faSpinner} size="4x" spin color="#888" />
                            <div className="loading-messageMGFP">Registrando investimento...</div>
                        </div>
                    )}

                    <div className="button-containerMGFP">
                        <button type="button" className="cancel-btnMGFP" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="submit-btnMGFP">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CadastroMoedaPopup;
