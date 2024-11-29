import React, { useState, useEffect, useRef } from 'react';
import styles from './Relatorios.module.css';
import Header from "../Header";

const Relatorios = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);  // Estado para controlar a exibição do popup
    const popupRef = useRef(null);

    // Função para abrir o popup
    const openPopup = () => {
        setIsPopupOpen(true);
    };

    // Função para fechar o popup
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    // Fechar o popup ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                closePopup();  // Fechar o popup ao clicar fora
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.container}>
            <Header />
            <h2>Relatórios</h2>
            {/* Botão para abrir o popup */}
            <button onClick={openPopup} type="button">Cadastrar Receita</button>

            {/* Exibição do popup, se estiver aberto */}
            {isPopupOpen && (
                <div ref={popupRef} className={styles.popup}>
                    <div className={styles.popupContent}>
                        <h3>Cadastro de Receita</h3>
                        {/* Formulário de cadastro de receita ou conteúdo do popup */}
                        <button onClick={closePopup} type="button">Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Relatorios;
