import React, { useState, useRef, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NumericFormat } from 'react-number-format';
import './CadDespesa.css';
import { faSpinner, faSearch, faCalendar, faMoneyBillWave, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../segurança/JWT/AuthContext'; // Ajuste o caminho para seu AuthProvider

const CadastroDespesa = ({ isOpen, onClose }) => {
    const { token } = useContext(AuthContext); // Obtém o token do contexto de autenticação
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [banco, setBanco] = useState('');
    const [cartao, setCartao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [frequencia, setFrequencia] = useState('');
    const [parcelado, setParcelado] = useState(false);
    const [quantidadeParcelas, setQuantidadeParcelas] = useState('');
    const [tags, setTags] = useState('');
    const [repetir, setRepetir] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [bancos, setBancos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [situacao, setSituacao] = useState('Pendente');  // Nova variável para situação

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
        const fetchBancos = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/gfp/banco', {
                    headers: {
                        'HTTP-KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setBancos(data.bancos || []);
            } catch (err) {
                console.error('Erro ao buscar bancos:', err);
            }
        };

        fetchBancos();
    }, [token]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/gfp/categoria', {
                    headers: {
                        'HTTP-KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setCategorias(data.categorias || []);
            } catch (err) {
                console.error('Erro ao buscar categorias:', err);
            }
        };

        fetchCategorias();
    }, [token]);

    const handleTagsChange = (e) => {
        setTagInput(e.target.value);
    };

    const handleTagAdd = () => {
        if (tagInput && tags.split(',').length < 3) {
            setTags((prevTags) => (prevTags ? `${prevTags},${tagInput}` : tagInput));
            setTagInput('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        const submitData = {
            descricao,
            valor,
            data,
            banco,
            cartao,
            categoria,
            tags,
            tipo_despesa_fixa: repetir,
            frequencia,
            tipo_lancamento_parcelado: parcelado,
            quantidade_parcelas: parcelado ? quantidadeParcelas : null,
            situacao, // Novo campo para situação
        };

        try {
            const response = await fetch('http://localhost:5000/api/gfp/despesa/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'HTTP-KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(submitData),  // Usando submitData
            });

            if (!response.ok) {
                throw new Error('Falha ao cadastrar a despesa');
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

    return (
        <div className="popupRVGF_cad-despesa">
            <div className="popup-contentRVGF_cad-despesa" ref={popupRef}>
                <span className="closeRVGF_cad-despesa" onClick={onClose}>&times;</span>
                <h2>Cadastro de Despesa</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-groupRVGF_cad-despesa">
                        <label>Descrição:</label>
                        <input
                            type="text"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-groupRVGF_cad-despesa">
                        <label>Valor:</label>
                        <NumericFormat
                            value={valor}
                            onValueChange={(values) => setValor(values.value)}
                            thousandSeparator="."
                            decimalSeparator=","
                            allowNegative={false}
                            prefix="R$ "
                            required
                        />
                    </div>

                    <div className="input-groupRVGF_cad-despesa">
                        <label>Data:</label>
                        <input
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-groupRVGF_cad-despesa">
                        <label>Conta/Cartão:</label>
                        <select value={banco} onChange={(e) => setBanco(e.target.value)} required>
                            <option value="">Selecione um banco</option>
                            {bancos.map((banco, index) => (
                                <option key={index} value={banco.nome_banco}>
                                    {banco.nome_banco}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-groupRVGF_cad-despesa">
                        <label>Categoria:</label>
                        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                            <option value="">Selecione uma categoria</option>
                            {categorias.map((categoria, index) => (
                                <option key={index} value={categoria.nome}>
                                    {categoria.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-groupRVGF_cad-despesa">
                        <label>Repetir:</label>
                        <button
                            type="button"
                            className={`toggle-btn ${repetir ? 'active' : ''}`}
                            onClick={() => setRepetir(!repetir)}
                        >
                            {repetir ? 'Sim' : 'Não'}
                        </button>
                    </div>

                    {repetir && (
                        <div className="input-groupRVGF_cad-despesa">
                            <label>Selecione a Frequência:</label>
                            <select value={frequencia} onChange={(e) => setFrequencia(e.target.value)} required>
                                <option value="">Selecione</option>
                                <option value="Diário">Diário</option>
                                <option value="Semanal">Semanal</option>
                                <option value="Quinzenal">Quinzenal</option>
                                <option value="Mensal">Mensal</option>
                                <option value="Anual">Anual</option>
                            </select>
                        </div>
                    )}

                    <div className="input-groupRVGF_cad-despesa">
                        <label>Lançamento Parcelado:</label>
                        <button
                            type="button"
                            className={`toggle-btn ${parcelado ? 'active' : ''}`}
                            onClick={() => setParcelado(!parcelado)}
                        >
                            {parcelado ? 'Sim' : 'Não'}
                        </button>
                    </div>

                    {parcelado && (
                        <div className="input-groupRVGF_cad-despesa">
                            <label>Quantidade de Parcelas:</label>
                            <input
                                type="number"
                                value={quantidadeParcelas}
                                onChange={(e) => setQuantidadeParcelas(e.target.value)}
                                min="1"
                                required
                            />
                        </div>
                    )}

                    <div className="input-groupRVGF_cad-despesa">
                        <label>Situação:</label>
                        <select value={situacao} onChange={(e) => setSituacao(e.target.value)} required>
                            <option value="Pendente">Pendente</option>
                            <option value="Pago">Pago</option>
                        </select>
                    </div>

                    <div className="input-groupRVGF_cad-despesa">
                        <label>Tags:</label>
                        <div className="tag-input">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={handleTagsChange}
                                placeholder="Adicionar uma tag"
                            />
                            <button type="button" onClick={handleTagAdd}>
                                +
                            </button>
                        </div>
                        <div className="tags-list">
                            {tags.split(',').map((tag, index) => (
                                <span key={index} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className="submit-section">
                        <button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <FontAwesomeIcon icon={faSpinner} spin />
                                    Enviando...
                                </>
                            ) : (
                                'Cadastrar'
                            )}
                        </button>
                    </div>

                    {success && <div className="success-message">Despesa cadastrada com sucesso!</div>}
                    {error && <div className="error-message">Erro ao cadastrar despesa. Tente novamente.</div>}
                </form>
            </div>
        </div>
    );
};

export default CadastroDespesa;
