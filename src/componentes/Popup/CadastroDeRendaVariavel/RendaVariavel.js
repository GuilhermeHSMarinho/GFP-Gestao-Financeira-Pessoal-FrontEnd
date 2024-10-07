import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NumericFormat } from 'react-number-format'; // Alterado para NumericFormat
import './RendaVariavel.css';
import {
    faThumbsUp,
    faThumbsDown,
    faSpinner
} from '@fortawesome/free-solid-svg-icons' ;

// Dados para auto completar
const corretoras = ['Corretora A', 'Corretora B', 'Corretora C'].sort();
const ativos = ['ATIVO1', 'ATIVO2', 'ATIVO3'].sort();

const RVGFPopupInvestimento = ({ isOpen, onClose }) => {
    const [corretora, setCorretora] = useState('');
    const [codigoAtivo, setCodigoAtivo] = useState('');
    const [quantidade, setQuantidade] = useState(0);
    const [cotacao, setCotacao] = useState('');
    const [dataInvestimento, setDataInvestimento] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

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

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        const data = {
            corretora,
            codigoAtivo,
            quantidade,
            cotacao: Number(cotacao.replace(/\./g, '').replace(',', '.')), // Converte o valor da cotação em número
            dataInvestimento
        };

        console.log('Dados a serem enviados:', data);

        try {
            const response = await fetch('https://sua-api-url.com/investimentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
        <div className="popupRVGF">
            <div className="popup-contentRVGF" ref={popupRef}>
                <span className="closeRVGF" onClick={onClose}>&times;</span>
                <h2>Cadastro de Investimento</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-groupRVGF">
                        <label>Corretora:</label>
                        <input
                            type="text"
                            list="corretoras"
                            value={corretora}
                            onChange={(e) => setCorretora(e.target.value)}
                            required
                        />
                        <datalist id="corretoras">
                            {corretoras.map((item, index) => (
                                <option key={index} value={item} />
                            ))}
                        </datalist>
                    </div>

                    <div className="input-groupRVGF">
                        <label>Código do Ativo:</label>
                        <input
                            type="text"
                            list="ativos"
                            value={codigoAtivo}
                            onChange={(e) => setCodigoAtivo(e.target.value)}
                            required
                        />
                        <datalist id="ativos">
                            {ativos.map((item, index) => (
                                <option key={index} value={item} />
                            ))}
                        </datalist>
                    </div>

                    <div className="input-groupRVGF">
                        <label>Quantidade:</label>
                        <input
                            type="number"
                            value={quantidade}
                            onChange={(e) => setQuantidade(Number(e.target.value))}
                            required
                            step="0.01"
                        />
                    </div>

                    <div className="input-groupRVGF">
                        <label>Cotação do Ativo:</label>
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

                    <div className="input-groupRVGF">
                        <label>Data do Investimento:</label>
                        <input
                            type="date"
                            value={dataInvestimento}
                            onChange={(e) => setDataInvestimento(e.target.value)}
                            required
                        />
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
                    <div className="overlay-iconRVGF">
                        <FontAwesomeIcon icon={success ? faThumbsUp : faThumbsDown} size="4x" color="#000" />
                        <div className="feedback-messageRVGF">
                            {success ? 'Cadastro realizado com sucesso!' : 'Falha ao cadastrar!'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RVGFPopupInvestimento;
