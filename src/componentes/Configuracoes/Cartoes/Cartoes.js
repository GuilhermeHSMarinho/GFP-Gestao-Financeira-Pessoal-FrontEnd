// Cartoes.js
import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FiTrash2 } from "react-icons/fi";
import '../Configuracoes.css'; // Reaproveitando o mesmo CSS

const Cartoes = ({ cartoes: initialCartoes }) => {
    const [cartoes, setCartoes] = useState(initialCartoes);
    const [icons, setIcons] = useState({});

    useEffect(() => {
        const loadIcons = async () => {
            const loadedIcons = {};
            await Promise.all(
                cartoes.map(async (cartao) => {
                    if (cartao.Param_Ico && !loadedIcons[cartao.Param_Ico]) {
                        const IconComponent = await loadIcon(cartao.Param_Ico);
                        loadedIcons[cartao.Param_Ico] = IconComponent;
                    }
                })
            );
            setIcons(loadedIcons);
        };

        loadIcons();
    }, [cartoes]);

    const loadIcon = async (Param_Ico) => {
        try {
            const { [Param_Ico]: Icon } = await import('react-icons/fa');
            return Icon;
        } catch (error) {
            console.error('Erro ao carregar o ícone:', error);
            return null;
        }
    };

    const getContrastYIQ = (hexcolor) => {
        const r = parseInt(hexcolor.slice(1, 3), 16);
        const g = parseInt(hexcolor.slice(3, 5), 16);
        const b = parseInt(hexcolor.slice(5, 7), 16);
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 128 ? '#000000' : '#FFFFFF';
    };

    const handleDelete = (id) => {
        setCartoes(cartoes.filter(cartao => cartao.nome !== id));
    };

    return (
        <div>
            <div className="categorias-container">
                {cartoes.length > 0 ? (
                    cartoes.map((cartao, index) => {
                        const IconComponent = icons[cartao.Param_Ico];
                        const iconColor = cartao.Color_hash;
                        const textColor = getContrastYIQ(iconColor);

                        return (
                            <div key={index} className="categoria-card">
                                <div className="categoria-icon" style={{ backgroundColor: iconColor }}>
                                    {IconComponent ? <IconComponent style={{ color: textColor }} /> : <div>Ícone não encontrado</div>}
                                </div>
                                <div className="categoria-info">
                                    <div className="categoria-nome">{cartao.nome}</div>
                                    <div className="categoria-dados">
                                        <div className="categoria-limite">
                                            <div className="categoria-titulo">Tipo</div>
                                            <div className="categoria-valor">{cartao.tipo}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="categoria-acoes">
                                    <div className="acao-icon editar-icone">
                                        <FaEdit /> {/* Ícone de edição */}
                                    </div>
                                    <div className="acao-icon deletar-icone" onClick={() => handleDelete(cartao.nome)}>
                                        <FiTrash2 /> {/* Ícone de lixeira */}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>Não há cartões disponíveis.</div>
                )}
            </div>
        </div>
    );
};

export default Cartoes;
