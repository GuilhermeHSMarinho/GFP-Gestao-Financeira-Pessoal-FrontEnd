// src/Popup/CadastroTesouroDireto/TesouroDiretoPopup.js
import React, { useState, useRef, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NumericFormat } from 'react-number-format';
import './TesouroDireto.css';
import { faThumbsUp, faThumbsDown, faSpinner, faSearch, faCalendar, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../segurança/JWT/AuthContext'; // Importe o contexto de autenticação

const TesouroDiretoPopup = ({ isOpen, onClose }) => {
    const { token } = useContext(AuthContext); // Acesse o token do contexto de autenticação
    const [corretora, setCorretora] = useState('');
    const [tituloInvestido, setTituloInvestido] = useState('');
    const [valorInvestido, setValorInvestido] = useState('');
    const [dataInvestimento, setDataInvestimento] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [corretorasFiltradas, setCorretorasFiltradas] = useState([]);
    const [selectedCorretoraError, setSelectedCorretoraError] = useState(false);
    const [titulos, setTitulos] = useState([]);


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

    useEffect(() => {
        const fetchTitulos = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/gdi/titulos_tesouro/consultar/t', {
                    headers: {
                        'Content-Type': 'application/json',
                        'HTTP-KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (data.titulos) {
                    const titulosFormatados = data.titulos.map(titulo => `${titulo.nome_titulo} : ${titulo.ano}`);
                    setTitulos(titulosFormatados);
                }
            } catch (err) {
                console.error('Erro ao buscar títulos:', err);
            }
        };

        fetchTitulos();
    }, [token]);


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
            titulo_investido: tituloInvestido.trim(),
            valor_investido: Number(valorInvestido.replace(/\./g, '').replace(',', '.')).toFixed(2),
            data_investimento: dataInvestimento,
        };

        try {
            const response = await fetch('http://localhost:5000/api/gdi/tesouro_direto/registro', {
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
        <div className="popupTDGF">
            <div className="popup-contentTDGF" ref={popupRef}>
                <span className="closeTDGF" onClick={onClose}>&times;</span>
                <h2>Cadastro de Tesouro Direto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-groupTDGF">
                        <label>Corretora:</label>
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
                            {corretorasFiltradas.map((item, index) => (
                                <option key={index} value={item}/>
                            ))}
                        </datalist>
                        {selectedCorretoraError &&
                            <div className="error-message">Selecione uma corretora válida da lista.</div>}
                    </div>

                    <div className="input-groupTDGF">
                        <label>Título Investido:</label>
                        <div className="input-with-icon espacamentoIcon">
                            <FontAwesomeIcon icon={faSearch} className="input-icon"/>
                            <input
                                type="text"
                                list="titulos"
                                value={tituloInvestido}
                                onChange={(e) => setTituloInvestido(e.target.value)}
                                required
                            />
                        </div>
                        <datalist id="titulos">
                            {titulos.map((titulo, index) => (
                                <option key={index} value={titulo}/>
                            ))}
                        </datalist>
                    </div>


                    <div className="input-groupTDGF">
                        <label>Valor Investido:</label>
                        <div className="input-with-icon espacamentoIcon">
                            <FontAwesomeIcon icon={faMoneyBillWave} className="input-icon"/>
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

                    <div className="input-groupTDGF">
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

                {loading && <div className="loading-messageTDGF">Enviando...</div>}

                {(success || error) && (
                    <div className="overlay-iconTDGF">
                        <FontAwesomeIcon icon={success ? faThumbsUp : faThumbsDown} size="4x" color="#000"/>
                        <div className="feedback-messageTDGF">
                            {success ? 'Cadastro realizado com sucesso!' : 'Falha ao cadastrar!'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TesouroDiretoPopup;
