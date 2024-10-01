import React, { useState } from 'react';
import { SliderPicker } from 'react-color';
import './CategoriaGestãoFinanceira.css';

// Função para importar ícones SVG
const importIcons = (requireContext) => {
    const icons = {};
    requireContext.keys().forEach((item) => {
        const iconName = item.replace('./iconesCategorias', '').replace('.svg', '');
        icons[iconName] = requireContext(item);
    });
    return icons;
};

// Importando os ícones SVG da pasta
const icons = importIcons(require.context('./iconesCategorias', false, /\.svg$/));

const CategoriaGF = ({ isOpen, onClose }) => {
    const [categoryName, setCategoryName] = useState('');
    const [selectedColor, setSelectedColor] = useState('#fff'); // Inicializa com branco
    const [tempColor, setTempColor] = useState('#fff'); // Cor temporária para transição
    const [selectedIcon, setSelectedIcon] = useState('');

    if (!isOpen) return null;

    const handleIconSelect = (iconName) => {
        setSelectedIcon(iconName);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode lidar com o envio dos dados
        console.log('Nome da categoria:', categoryName);
        console.log('Cor selecionada (HEX):', selectedColor); // Cor em formato HEX
        console.log('Ícone selecionado:', selectedIcon);
        onClose(); // Fechar o pop-up após o envio
    };

    const handleColorChange = (color) => {
        setTempColor(color.hex); // Atualiza a cor temporária
    };

    const handleColorChangeComplete = (color) => {
        setSelectedColor(color.hex); // Atualiza a cor selecionada
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Cadastro de Categoria</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Nome da Categoria:</label>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Selecione uma Cor:</label>
                        <SliderPicker
                            color={tempColor}
                            onChange={handleColorChange} // Altera a cor temporária ao mover o slider
                            onChangeComplete={handleColorChangeComplete} // Altera a cor final ao soltar
                        />
                        <div className="color-display" style={{ backgroundColor: selectedColor }}/>
                    </div>

                    <div>
                        <label>Selecione um Ícone:</label>
                        <div className="icon-grid">
                            {Object.keys(icons).map((iconName) => (
                                <div key={iconName} className="icon-item" onClick={() => handleIconSelect(iconName)}>
                                    <img src={icons[iconName]} alt={iconName}/>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit">Salvar</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default CategoriaGF;
