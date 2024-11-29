import React, { useState, useRef, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NumericFormat } from 'react-number-format';
import './RendaVariavel.css';
import { faSpinner, faSearch, faCalendar, faMoneyBillWave, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../segurança/JWT/AuthContext'; // Ajuste o caminho para seu AuthProvider

const RVGFPopupInvestimento = ({ isOpen, onClose }) => {
    const { token } = useContext(AuthContext); // Obtém o token do contexto de autenticação
    const [corretora, setCorretora] = useState('');
    const [codigoAtivo, setCodigoAtivo] = useState('');
    const [quantidade, setQuantidade] = useState(0);
    const [cotacao, setCotacao] = useState('');
    const [dataInvestimento, setDataInvestimento] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [corretorasFiltradas, setCorretorasFiltradas] = useState([]);
    const [ativosFiltrados, setAtivosFiltrados] = useState([]);
    const [corretoraError, setCorretoraError] = useState(false);
    const [ativoError, setAtivoError] = useState(false);
    const [selectedCorretoraError, setSelectedCorretoraError] = useState(false);

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
        const fetchCorretoras = async (termo) => {
            if (termo.length < 1) {
                setCorretorasFiltradas([]);
                return;
            }
            try {
                const response = await fetch(`http://localhost:5000/api/gdi/corretora/consultar/${termo}`, {
                    headers: {
                        'HTTP-KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                console.log('Corretoras retornadas:', data);

                if (data.corretoras) {
                    setCorretorasFiltradas(data.corretoras);
                    setCorretoraError(false);
                } else {
                    setCorretorasFiltradas([]);
                    setCorretoraError(true);
                    setTimeout(() => setCorretoraError(false), 5000); // Remove erro após 5 segundos
                }
            } catch (err) {
                console.error('Erro ao buscar corretoras:', err);
                setCorretoraError(true);
                setTimeout(() => setCorretoraError(false), 5000); // Remove erro após 5 segundos
            }
        };

        fetchCorretoras(corretora);
    }, [corretora, token]);

    useEffect(() => {
        const fetchAtivos = async (termo) => {
            if (termo.length < 1) {
                setAtivosFiltrados([]);
                return;
            }
            try {
                const response = await fetch(`http://localhost:5000/api/gdi/ativo/consultar/${termo}`, {
                    headers: {
                        'HTTP-KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
                    },
                });

                const data = await response.json();
                console.log('Ativos retornados:', data);

                if (data.ativos) {
                    setAtivosFiltrados(data.ativos.map(ativo => ({ codigo: ativo.codigo_ativo, nome: ativo.nome })));
                    setAtivoError(false);
                } else {
                    setAtivosFiltrados([]);
                    setAtivoError(true);
                    setTimeout(() => setAtivoError(false), 5000); // Remove erro após 5 segundos
                }
            } catch (err) {
                console.error('Erro ao buscar ativos:', err);
                setAtivoError(true);
                setTimeout(() => setAtivoError(false), 5000); // Remove erro após 5 segundos
            }
        };

        fetchAtivos(codigoAtivo);
    }, [codigoAtivo]);

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

        const codigoAtivoLimpo = codigoAtivo.split(' - ')[0]; // Extrai apenas o código do ativo

        const data = {
            nome_corretora: corretora,
            codigo_ativo: codigoAtivoLimpo.trim(), // Envia apenas o código do ativo
            quantidade,
            cotacao: Number(cotacao.replace(',', '.')), // Converte a cotação trocando vírgula por ponto
            data_investimento: formatDate(dataInvestimento), // Formata a data para o formato "DD-MM-YYYY"
        };

        console.log('Dados a serem enviados:', data);

        try {
            const response = await fetch('http://localhost:5000/api/gdi/renda_variavel/registro', {
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
            setTimeout(() => setSuccess(null), 5000); // Remove sucesso após 5 segundos
        } catch (err) {
            setError(true);
            setTimeout(() => setError(null), 5000); // Remove erro após 5 segundos
        } finally {
            setLoading(false);
            setTimeout(() => {
                onClose();
            }, 3000);
        }
    };

    // Função para formatar a data no formato "DD-MM-YYYY"
    const formatDate = (dateString) => {
        const dateParts = dateString.split('-'); // Supondo que a data original esteja no formato "YYYY-MM-DD"
        if (dateParts.length === 3) {
            return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // Retorna no formato "DD-MM-YYYY"
        }
        return dateString; // Retorna a string original se não estiver no formato esperado
    };

    return (
        <div className="popupRVGF">
            <div className="popup-contentRVGF" ref={popupRef}>
                <span className="closeRVGF" onClick={onClose}>&times;</span>
                <h2>Cadastro de Renda Variável</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-groupRVGF">
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
                        {corretoraError && <div className="error-message">Erro ao buscar corretoras, tente novamente.</div>}
                        {selectedCorretoraError && <div className="error-message">Selecione uma corretora válida da lista.</div>}
                    </div>

                    <div className="input-groupRVGF">
                        <label>Código do Ativo:</label>
                        <div className="input-with-icon espacamentoIcon">
                            <FontAwesomeIcon icon={faSearch} className="input-icon" />
                            <input
                                type="text"
                                list="ativos"
                                value={codigoAtivo}
                                onChange={(e) => setCodigoAtivo(e.target.value)}
                                required
                            />
                        </div>
                        <datalist id="ativos">
                            {ativosFiltrados.map((ativo, index) => (
                                <option key={index} value={`${ativo.codigo} - ${ativo.nome}`} />
                            ))}
                        </datalist>
                        {ativoError && <div className="error-message">Erro ao buscar ativos, tente novamente.</div>}
                    </div>

                    <div className="input-groupRVGF">
                        <label>Quantidade:</label>
                        <div className="input-with-icon espacamentoIcon">
                            <FontAwesomeIcon icon={faHashtag} className="input-icon" />
                            <input
                                type="number"
                                value={quantidade}
                                onChange={(e) => setQuantidade(Number(e.target.value))}
                                required
                                step="0.1"
                            />
                        </div>
                    </div>

                    <div className="input-groupRVGF">
                        <label>Cotação do Ativo:</label>
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

                    <div className="input-groupRVGF">
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

                    <div className="button-containerRVGF">
                        <button className="cancel-btnRVGF" type="button" onClick={onClose}>Cancelar</button>
                        <button className="submit-btnRVGF" type="submit" disabled={loading}>
                            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Cadastrar'}
                        </button>
                    </div>
                </form>

                {loading && <div className="loading-messageRVGF">Enviando...</div>}

                {(success || error) && (
                    <div className={`message ${success ? 'success' : 'error'}`}>
                        {success ? 'Investimento cadastrado com sucesso!' : 'Erro ao cadastrar investimento.'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RVGFPopupInvestimento;
