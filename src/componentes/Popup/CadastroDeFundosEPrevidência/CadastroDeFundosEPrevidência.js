import React, { useState, useRef, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NumericFormat } from 'react-number-format';
import Switch from 'react-switch'; // Importando a biblioteca do Switch
import './CadastroDeFundosEPrevidência.css';
import { faThumbsUp, faThumbsDown, faSpinner, faSearch, faCalendar, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../segurança/JWT/AuthContext'; // Ajuste o caminho conforme necessário

const CFPPopupCadastroDeFundosEPrevidencia = ({ isOpen, onClose }) => {
    const { token } = useContext(AuthContext); // Obtém o token do contexto de autenticação
    const HTTP_KEY = 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e'; // Substitua pelo seu HTTP key real
    const [corretora, setCorretora] = useState('');
    const [descricaoCNPJ, setDescricaoCNPJ] = useState('');
    const [quantidade, setQuantidade] = useState(0);
    const [valorInvestido, setValorInvestido] = useState('');
    const [valorCota, setValorCota] = useState('');
    const [dataInvestimento, setDataInvestimento] = useState('');
    const [compraPorQuantidade, setCompraPorQuantidade] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [corretorasFiltradas, setCorretorasFiltradas] = useState([]);

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
                        'Authorization': `Bearer ${token}`, // Adiciona o token ao cabeçalho
                        'HTTP-KEY': HTTP_KEY, // Adiciona o HTTP key ao cabeçalho
                    },
                });

                const data = await response.json();
                console.log('Corretoras retornadas:', data);

                if (data.corretoras) {
                    setCorretorasFiltradas(data.corretoras);
                } else {
                    setCorretorasFiltradas([]);
                }
            } catch (err) {
                console.error('Erro ao buscar corretoras:', err);
                setCorretorasFiltradas([]);
            }
        };

        fetchCorretoras(corretora);
    }, [corretora, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        // Estrutura do objeto a ser enviado com base no modo de compra
        const data = {
            nome_corretora: corretora,
            descricao_fundo: descricaoCNPJ,
            data_investimento: formatData(dataInvestimento), // Formata a data
        };

        if (compraPorQuantidade) {
            data.quantidade_cota = parseInt(quantidade, 10); // Converte a quantidade para um número inteiro
            data.valor_cota = formatarValor(valorCota); // Formata o valor da cota
            const url = 'http://localhost:5000/api/gdi/fundo_previdencia/registro-cota';
            console.log('Dados a serem enviados para registro de cota:', data);
            await sendData(url, data);
        } else {
            data.valor_investido = formatarValor(valorInvestido); // Formata o valor investido
            const url = 'http://localhost:5000/api/gdi/fundo_previdencia/registro-valor';
            console.log('Dados a serem enviados para registro de valor:', data);
            await sendData(url, data);
        }
    };

    const sendData = async (url, data) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Adiciona o token ao cabeçalho
                    'HTTP-KEY': HTTP_KEY, // Adiciona o HTTP key ao cabeçalho
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Falha ao cadastrar');
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

    const formatData = (data) => {
        const partes = data.split('-');
        return `${partes[2]}-${partes[1]}-${partes[0]}`; // Converte de dd-mm-yyyy para yyyy-mm-dd
    };

    const formatarValor = (valor) => {
        // Substituir vírgula por ponto e converter para número
        const valorNumerico = parseFloat(valor.replace(',', '.'));

        // Retornar o valor formatado com duas casas decimais
        return valorNumerico.toFixed(2);
    };

    if (!isOpen) return null;

    return (
        <div className="popupCFP">
            <div className="popup-contentCFP" ref={popupRef}>
                <span className="closeCFP" onClick={onClose}>&times;</span>
                <h2>Cadastro de Fundos e Previdência</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-groupCFP">
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
                    </div>

                    <div className="input-groupCFP">
                        <label>Descrição ou CNPJ do Fundo:</label>
                        <input
                            type="text"
                            value={descricaoCNPJ}
                            onChange={(e) => setDescricaoCNPJ(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-groupCFP">
                        <label style={{ display: 'flex', alignItems: 'center' }}>
                            <Switch
                                onChange={() => setCompraPorQuantidade(!compraPorQuantidade)}
                                checked={compraPorQuantidade}
                                offColor="#888"
                                onColor="#48bb78"
                                uncheckedIcon={false}
                                checkedIcon={false}
                                height={20}
                                width={40}
                                handleDiameter={20}
                                className="react-switch"
                                id="material-switch"
                            />
                            <span>Investir por quantidade e cota:</span>
                        </label>
                    </div>

                    {/* Exibe o campo Valor Investido apenas se a switch não estiver marcada */}
                    {!compraPorQuantidade && (
                        <div className="input-groupCFP">
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
                    )}

                    {/* Exibe os campos Quantidade de Cotas e Valor da Cota apenas se a switch estiver marcada */}
                    {compraPorQuantidade && (
                        <>
                            <div className="input-groupCFP">
                                <label>Quantidade de Cotas:</label>
                                <input
                                    type="number"
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(e.target.value)}
                                    min="1"
                                    required
                                />
                            </div>
                            <div className="input-groupCFP">
                                <label>Valor da Cota:</label>
                                <div className="input-with-icon espacamentoIcon">
                                    <FontAwesomeIcon icon={faMoneyBillWave} className="input-icon" />
                                    <NumericFormat
                                        value={valorCota}
                                        onValueChange={(values) => setValorCota(values.value)}
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
                        </>
                    )}

                    <div className="input-groupCFP">
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

                    <div className="button-containerCFP">
                        <button className="cancel-btnCFP" type="button" onClick={onClose}>Cancelar</button>
                        <button className="submit-btnCFP" type="submit" disabled={loading}>
                            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Cadastrar'}
                        </button>
                    </div>
                </form>

                {loading && <div className="loading-messageCFP">Enviando...</div>}

                {(success || error) && (
                    <div className="overlay-iconCFP">
                        <FontAwesomeIcon icon={success ? faThumbsUp : faThumbsDown} size="4x" color="#000" />
                        <div className="feedback-messageCFP">
                            {success ? 'Cadastro realizado com sucesso!' : 'Falha ao cadastrar!'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CFPPopupCadastroDeFundosEPrevidencia;
