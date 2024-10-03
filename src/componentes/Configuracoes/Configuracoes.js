import React, { useState } from 'react';
import './Configuracoes.css'; // Estilo do componente

const Configuracoes = () => {
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('pt');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleNotificationToggle = () => {
        setNotificationsEnabled(!notificationsEnabled);
    };

    const handleSave = () => {
        // Aqui você pode adicionar a lógica para salvar as configurações
        console.log('Configurações salvas:', { theme, language, notificationsEnabled });
    };

    return (
        <div className="configuracoes">
            <h2>Configurações</h2>
            <div className="configuracao">
                <label htmlFor="theme">Tema:</label>
                <select id="theme" value={theme} onChange={handleThemeChange}>
                    <option value="light">Claro</option>
                    <option value="dark">Escuro</option>
                </select>
            </div>
            <div className="configuracao">
                <label htmlFor="language">Idioma:</label>
                <select id="language" value={language} onChange={handleLanguageChange}>
                    <option value="pt">Português</option>
                    <option value="en">Inglês</option>
                    {/* Adicione mais idiomas conforme necessário */}
                </select>
            </div>
            <div className="configuracao">
                <label htmlFor="notifications">Notificações:</label>
                <input
                    type="checkbox"
                    id="notifications"
                    checked={notificationsEnabled}
                    onChange={handleNotificationToggle}
                />
            </div>
            <button onClick={handleSave}>Salvar Configurações</button>
        </div>
    );
};

export default Configuracoes;
