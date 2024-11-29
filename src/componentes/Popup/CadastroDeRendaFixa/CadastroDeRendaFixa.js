import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NumericFormat } from 'react-number-format';
import { faSpinner, faSearch, faCalendar, faMoneyBillWave, faHashtag, faPercent } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../segurança/JWT/AuthContext'; // Importar o AuthContext
import './CadastroDeRendaFixa.css'; // Importando o CSS

const tiposRendaFixa = [
    'CDB - Certificado de Depósito Bancário',
    'LCI - Letra de Crédito Imobiliário',
    'LCA - Letra de Crédito do Agronegócio',
    'LF - Letra Financeira',
    'LC - Letra de Câmbio',
    'CDCA - Certificado de Direitos Creditórios do Agronegócio',
    'DPGE - Depósito a Prazo com Garantia Especial',
    'RDB - Recibo de Depósito Bancário',
    'CRI - Certificado de Recebível Imobiliário',
    'CRA - Certificado de Recebível Agronegócio',
    'RDC - Recibo de Depósito Cooperativo',
    'LIG - Letra Imobiliária Garantida',
    'Debênture',
    'Debênture Incentivada'
].sort();
const tiposRendaFixaInvestida = ['Prefixada', 'Pós-fixada'];
const indexadores = ['CDI', 'CDI', 'IPCA', 'IGPM', 'IGPM + Taxa'];

const RendaFixaPopupCadastro = ({ isOpen, onClose }) => {
    const [corretora, setCorretora] = useState('');
    const [emissor, setEmissor] = useState('');
    const [descricaoInvestimento, setDescricaoInvestimento] = useState('');
    const [papelRendaFixa, setPapelRendaFixa] = useState('');
    const [valorInvestido, setValorInvestido] = useState('');
    const [dataVencimento, setDataVencimento] = useState('');
    const [tipoRendaFixaInvestida, setTipoRendaFixaInvestida] = useState('');
    const [indexador, setIndexador] = useState('');
    const [valorIndexador, setValorIndexador] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [corretorasList, setCorretorasList] = useState([]);
    const [emissoresList, setEmissoresList] = useState([]);
    const popupRef = useRef(null);

    const { token } = useContext(AuthContext); // Obtém o token do contexto

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

    const fetchCorretoras = useCallback(async (termo) => {
        try {
            const response = await fetch(`http://localhost:5000/api/gdi/corretora/consultar/${termo}`, {
                headers: {
                    'HTTP-KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setCorretorasList(data.corretoras || []);
        } catch (error) {
            console.error('Erro ao buscar corretoras:', error);
        }
    }, [token]);

    const fetchEmissores = useCallback(async (termo) => {
        try {
            const response = await fetch(`http://localhost:5000/api/gdi/banco/consultar/${termo}`, {
                headers: {
                    'HTTP-KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            const emissores = data.bancos.map(banco => banco.nome);
            setEmissoresList(emissores || []);
        } catch (error) {
            console.error('Erro ao buscar emissores:', error);
        }
    }, [token]);

    useEffect(() => {
        if (corretora) {
            fetchCorretoras(corretora);
        }
    }, [corretora, fetchCorretoras]);

    useEffect(() => {
        if (emissor) {
            fetchEmissores(emissor);
        }
    }, [emissor, fetchEmissores]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        // Dados para o registro pré-fixado
        const dataPre = {
            nome_corretora: corretora,
            emissor,
            descricao: descricaoInvestimento,
            tipo_renda_fixa: tipoRendaFixaInvestida,
            tipo_papel: papelRendaFixa,
            taxa: 0, // Valor da taxa, dependendo do tipo
            valor_investido: Number(valorInvestido.replace(/\./g, '').replace(',', '.')), // Valor investido, tratado como número
            data_investimento: new Date().toISOString().split('T')[0],
            vencimento: dataVencimento,
        };

        console.log(dataPre); // Adicione esta linha para ver os dados que serão enviados

        // Dados para o registro pós-fixado
        const dataPos = {
            nome_corretora: corretora,
            emissor,
            descricao: descricaoInvestimento,
            tipo_renda_fixa: tipoRendaFixaInvestida,
            indexador, // Indexador específico para renda fixa pós-fixada
            tipo_papel: papelRendaFixa,
            taxa: valorIndexador, // Taxa específica para renda fixa pós-fixada
            valor_investido: 0, // Valor investido será 0 para pós-fixada
            data_investimento: new Date().toISOString().split('T')[0],
            vencimento: dataVencimento,
        };

        // Escolha do endpoint com base no tipo de renda fixa
        const endpoint = tipoRendaFixaInvestida === 'Prefixada'
            ? 'http://localhost:5000/api/gdi/renda_fixa/registro-pre'
            : 'http://localhost:5000/api/gdi/renda_fixa/registro-pos';

        // Objeto a ser enviado
        const jsonData = tipoRendaFixaInvestida === 'Prefixada' ? dataPre : dataPos;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'HTTP-KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(jsonData), // Enviando os dados
            });

            if (!response.ok) {
                throw new Error('Falha ao cadastrar');
            }

            setSuccess(true); // Sucesso no cadastro
        } catch (err) {
            setError(true); // Erro no cadastro
        } finally {
            setLoading(false);
            setTimeout(() => {
                onClose(); // Fechar popup após um tempo
            }, 3000);
        }
    };


return (
        <div className="popupGFPRF">
            <div className="popup-contentGFPRF" ref={popupRef}>
                <span className="closeRendaFixa" onClick={onClose}>&times;</span>
                <h2>Cadastro de Renda Fixa</h2>

                <form onSubmit={handleSubmit}>
                    <div className="input-groupGFPRF">
                        <label>Em qual corretora você investiu?</label>
                        <div className="input-with-icon espacamentoIcon">
                            <FontAwesomeIcon icon={faSearch} className="input-icon"/>
                            <input
                                type="text"
                                list="corretoras"
                                value={corretora}
                                onChange={(e) => setCorretora(e.target.value)}
                                required
                            />
                        </div>
                        <datalist id="corretoras">
                            {corretorasList.map((item, index) => (
                                <option key={index} value={item}/>
                            ))}
                        </datalist>
                    </div>

                    <div className="input-groupGFPRF">
                        <label>Qual emissor do papel?</label>
                        <div className="input-with-icon espacamentoIcon">
                            <FontAwesomeIcon icon={faSearch} className="input-icon"/>
                            <input
                                type="text"
                                list="emissores"
                                value={emissor}
                                onChange={(e) => setEmissor(e.target.value)}
                                required
                            />
                        </div>
                        <datalist id="emissores">
                            {emissoresList.map((item, index) => (
                                <option key={index} value={item}/>
                            ))}
                        </datalist>
                    </div>

                    <div className="input-groupGFPRF">
                        <label>Qual a descrição do seu investimento?</label>
                        <div className="input-with-icon espacamentoIcon">
                            <FontAwesomeIcon icon={faHashtag} className="input-icon"/>
                            <input
                                type="text"
                                value={descricaoInvestimento}
                                onChange={(e) => setDescricaoInvestimento(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-groupGFPRF">
                        <label>Qual tipo da renda fixa investida?</label>
                        <div className="input-with-icon espacamentoIcon">
                            <FontAwesomeIcon icon={faHashtag} className="input-icon"/>
                            <select
                                value={tipoRendaFixaInvestida}
                                onChange={(e) => setTipoRendaFixaInvestida(e.target.value)}
                                required
                            >
                                <option value="">Selecione um tipo</option>
                                {tiposRendaFixaInvestida.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="input-groupGFPRF">
                        <label>Qual papel da renda fixa?</label>
                        <div className="input-with-icon espacamentoIcon">
                            <FontAwesomeIcon icon={faSearch} className="input-icon"/>
                            <select
                                value={papelRendaFixa}
                                onChange={(e) => setPapelRendaFixa(e.target.value)}
                                required
                            >
                                <option value="">Selecione um papel</option>
                                {tiposRendaFixa.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {tipoRendaFixaInvestida === 'Pós-fixada' && (
                        <div className="input-groupGFPRF">
                            <label>Escolha um indexador:</label>
                            <div className="input-with-icon espacamentoIcon">
                                <FontAwesomeIcon icon={faPercent} className="input-icon"/>
                                <select
                                    value={indexador}
                                    onChange={(e) => setIndexador(e.target.value)}
                                    required
                                >
                                    <option value="">Selecione um indexador</option>
                                    {indexadores.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="input-groupGFPRF">
                        <label>Qual o valor {tipoRendaFixaInvestida === 'Pós-fixada' ? 'do indexador' : 'investido'}?</label>
                        <div className="input-with-icon espacamentoIcon">
                            <FontAwesomeIcon icon={faMoneyBillWave} className="input-icon"/>
                            <NumericFormat
                                value={tipoRendaFixaInvestida === 'Pós-fixada' ? valorIndexador : valorInvestido}
                                onValueChange={(values) => {
                                    const { value } = values;

                                    // Verifica se o valor é um número válido e não negativo
                                    if (tipoRendaFixaInvestida === 'Pós-fixada') {
                                        if (!isNaN(value) && Number(value) >= 0) {
                                            setValorIndexador(value);
                                        }
                                    } else {
                                        if (!isNaN(value) && Number(value) >= 0) {
                                            setValorInvestido(value);
                                        }
                                    }
                                }}
                                thousandSeparator="."
                                decimalSeparator=","
                                prefix={tipoRendaFixaInvestida === 'Pós-fixada' ? '' : 'R$ '}
                                allowNegative={false}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-groupGFPRF">
                        <label>Quando vence?</label>
                        <div className="input-with-icon espacamentoIcon">
                            <FontAwesomeIcon icon={faCalendar} className="input-icon"/>
                            <input
                                type="date"
                                value={dataVencimento}
                                onChange={(e) => setDataVencimento(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="button-containerGFPRF">
                        <button type="submit" className="submit-btnGFPRF" disabled={loading}>
                            {loading ? (
                                <FontAwesomeIcon icon={faSpinner} spin/>
                            ) : (
                                'Cadastrar'
                            )}
                        </button>
                        <button type="button" className="cancel-btnGFPRF" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>


                    {success && <div className="mensagem-sucesso">Cadastro realizado com sucesso!</div>}
                    {error && <div className="mensagem-erro">Erro ao cadastrar. Tente novamente.</div>}
                </form>
            </div>
        </div>
    );
};

export default RendaFixaPopupCadastro;
