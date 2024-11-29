import React, { useState, useRef, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NumericFormat } from 'react-number-format';
import './criptomoeda.css';
import {
    faThumbsUp,
    faThumbsDown,
    faSpinner,
    faSearch,
    faCalendar,
    faMoneyBillWave,
    faHashtag
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../segurança/JWT/AuthContext'; // Importe o contexto de autenticação

const CadastroCriptomoedaPopup = ({ isOpen, onClose }) => {
    const { token } = useContext(AuthContext); // Acesse o token do contexto de autenticação
    const [corretora, setCorretora] = useState('');
    const [criptomoedaInvestida, setCriptomoedaInvestida] = useState('');
    const [quantidadeComprada, setQuantidadeComprada] = useState('');
    const [cotacao, setCotacao] = useState('');
    const [dataInvestimento, setDataInvestimento] = useState('');
    const [casasDecimais, setCasasDecimais] = useState(2); // Estado para o número de casas decimais
    const [corretorasFiltradas, setCorretorasFiltradas] = useState([]);
    const [criptomoedasFiltradas, setCriptomoedasFiltradas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
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

    // Buscar criptomoedas
    useEffect(() => {
        const fetchCriptomoedas = async (termo) => {
            if (termo.length < 1) {
                setCriptomoedasFiltradas([]);
                return;
            }
            try {
                const response = await fetch(`http://localhost:5000/api/gdi/criptomoedas/consultar/${termo}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'HTTP-KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (data.criptomoedas) {
                    const criptomoedasFormatadas = data.criptomoedas.map(cripto => `${cripto.name}`);
                    setCriptomoedasFiltradas(criptomoedasFormatadas);
                } else {
                    setCriptomoedasFiltradas([]);
                }
            } catch (err) {
                console.error('Erro ao buscar criptomoedas:', err);
            }
        };

        fetchCriptomoedas(criptomoedaInvestida);
    }, [criptomoedaInvestida, token]);

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
            criptomoeda_investida: criptomoedaInvestida.trim(),
            quantidade_comprada: parseFloat(quantidadeComprada),
            cotacao: parseFloat(cotacao), // Ajustado para enviar o valor correto
            data_investimento: dataInvestimento,
        };

        try {
            const response = await fetch('http://localhost:5000/api/gdi/criptomoeda/registro', {
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
        <div className="popupCripto">
            <div className="popup-contentCripto" ref={popupRef}>
                <span className="closeCripto" onClick={onClose}>&times;</span>
                <h2>Cadastro de Criptomoeda</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-groupCripto">
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

                    <div className="input-groupCripto">
                        <label>Criptomoeda Investida:</label>
                        <div className="input-with-icon espacamentoIcon">
                            <FontAwesomeIcon icon={faSearch} className="input-icon" />
                            <input
                                type="text"
                                list="criptomoedas"
                                value={criptomoedaInvestida}
                                onChange={(e) => setCriptomoedaInvestida(e.target.value)}
                                required
                            />
                        </div>
                        <datalist id="criptomoedas">
                            {criptomoedasFiltradas.map((item, index) => (
                                <option key={index} value={item} />
                            ))}
                        </datalist>
                    </div>

                    <div className="input-groupCripto">
                        <label>Quantidade Comprada:</label>
                        <div className="input-with-icon espacamentoIcon">
                            <FontAwesomeIcon icon={faHashtag} className="input-icon"/>
                            <input
                                type="number"
                                step="0.00000001" // Permitir até 8 casas decimais
                                value={quantidadeComprada}
                                onChange={(e) => setQuantidadeComprada(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                        <div className="input-groupCripto">
                            <label>Cotação da Criptomoeda:</label>
                            <div className="input-with-icon espacamentoIcon">
                                <FontAwesomeIcon icon={faMoneyBillWave} className="input-icon"/>
                                <NumericFormat
                                    value={cotacao}
                                    onValueChange={(values) => setCotacao(values.value)}
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    decimalScale={casasDecimais} // Usar o valor selecionado
                                    fixedDecimalScale={true}
                                    allowNegative={false}
                                    required
                                />
                            </div>
                            <label>Casas Decimais:</label>
                            <select value={casasDecimais} onChange={(e) => setCasasDecimais(Number(e.target.value))}>
                                <option value={2}>2</option>
                                <option value={4}>4</option>
                                <option value={8}>8</option>
                            </select>
                        </div>

                        <div className="input-groupCripto">
                            <label>Data do Investimento:</label>
                            <div className="input-with-icon espacamentoIcon">
                                <FontAwesomeIcon icon={faCalendar} className="input-icon"/>
                                <input
                                    type="date"
                                    value={dataInvestimento}
                                    onChange={(e) => setDataInvestimento(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="button-containerTDGF">
                            <button className="cancel-btnTDGF" type="button" onClick={onClose}>Cancelar</button>
                            <button className="submit-btnTDGF" type="submit" disabled={loading}>
                                {loading ? <FontAwesomeIcon icon={faSpinner} spin/> : 'Cadastrar'}
                            </button>
                        </div>
                </form>

                {success &&
                    <div className="success-message"><FontAwesomeIcon icon={faThumbsUp}/> Investimento cadastrado com
                        sucesso!</div>}
                {error &&
                    <div className="error-message"><FontAwesomeIcon icon={faThumbsDown}/> Ocorreu um erro ao cadastrar o
                        investimento.</div>}
            </div>
        </div>
    );
};

export default CadastroCriptomoedaPopup;
