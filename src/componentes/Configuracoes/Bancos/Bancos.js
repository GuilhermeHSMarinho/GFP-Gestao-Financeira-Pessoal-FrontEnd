import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FiTrash2 } from "react-icons/fi";
import BancoCadastro from '../../Popup/CategoriaGestaoFinanceira/BancosGestãoFinanceira'; // Importe o componente BancoCadastro
import '../Configuracoes.css'; // Reaproveitando o mesmo CSS

const Bancos = ({ bancos: initialBancos }) => {
    const [bancos, setBancos] = useState(initialBancos);
    const [icons, setIcons] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [bancoEdit, setBancoEdit] = useState(null);

    useEffect(() => {
        const loadIcons = async () => {
            const loadedIcons = {};
            await Promise.all(
                bancos.map(async (banco) => {
                    if (banco.Param_Ico && !loadedIcons[banco.Param_Ico]) {
                        const IconComponent = await loadIcon(banco.Param_Ico);
                        loadedIcons[banco.Param_Ico] = IconComponent;
                    }
                })
            );
            setIcons(loadedIcons);
        };

        loadIcons();
    }, [bancos]);

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
        setBancos(bancos.filter(banco => banco.nome !== id));
    };

    const handleEditBanco = (banco) => {
        setBancoEdit(banco); // Passa os dados do banco a ser editado
        setIsOpen(true); // Abre o pop-up de edição
    };

    const handleAddBanco = (novoBanco) => {
        setBancos(prevBancos => [...prevBancos, novoBanco]);
        setIsOpen(false); // Fecha o pop-up após adicionar
        setBancoEdit(null); // Reseta o banco editado
    };

    return (
        <div>
            <div className="categorias-container">
                {bancos.length > 0 ? (
                    bancos.map((banco, index) => {
                        const IconComponent = icons[banco.Param_Ico];
                        const iconColor = banco.Color_hash;
                        const textColor = iconColor ? getContrastYIQ(iconColor) : '#000000'; // Verifica se iconColor está definido

                        return (
                            <div key={index} className="categoria-card">
                                <div className="categoria-icon" style={{ backgroundColor: iconColor }}>
                                    {IconComponent ? <IconComponent style={{ color: textColor }} /> : <div>Ícone não encontrado</div>}
                                </div>
                                <div className="categoria-info">
                                    <div className="categoria-nome">{banco.nome}</div>
                                    <div className="categoria-dados">
                                        <div className="categoria-limite">
                                            <div className="categoria-titulo">Saldo</div>
                                            <div className="categoria-valor">R$ {banco.saldo}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="categoria-acoes">
                                    <div className="acao-icon editar-icone" onClick={() => handleEditBanco(banco)}>
                                        <FaEdit /> {/* Ícone de edição */}
                                    </div>
                                    <div className="acao-icon deletar-icone" onClick={() => handleDelete(banco.nome)}>
                                        <FiTrash2 /> {/* Ícone de lixeira */}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>Não há bancos disponíveis.</div>
                )}
            </div>

            {/* Popup para cadastro/edição do banco */}
            <BancoCadastro
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onAddBanco={handleAddBanco}
                bancoEdit={bancoEdit}
            />
        </div>
    );
};

export default Bancos;
