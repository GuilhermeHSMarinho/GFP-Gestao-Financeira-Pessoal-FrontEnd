import React, { useState } from 'react';
import Header from '../Header';
import './Configuracoes.css';
import CategoriaGF from '../Popup/CategoriaGestaoFinanceira/CategoriaGestaoFinanceira';

const Configuracoes = () => {
    const [activeDiv, setActiveDiv] = useState(''); // Estado para controlar qual div deve ser exibida

    const [isCategoriaGFOpen, setCategoriaGFOpen] = useState(false);

    const openCategoriaGF = () => setCategoriaGFOpen(true);
    const closeCategoriaGF = () => setCategoriaGFOpen(false);

    const CategoriaDiv = () => {
        return <div>
            <div id="cssportal-grid-3">
                <div id="Gerenciamento-de-Categorias">Gerenciamento-de-Categorias</div>
                <div id="botao">
                    <button type="button" onClick={openCategoriaGF}>
                        teste
                    </button>
                    <CategoriaGF isOpen={isCategoriaGFOpen} onClose={closeCategoriaGF}/>
                </div>
                <div id="total">total</div>
                <div id="conteudo">conteudo</div>
            </div>

        </div>;
    };

    const BancosDiv = () => {
        return <div>Bancos: Aqui você pode configurar os bancos.</div>;
    };

    const CartoesDiv = () => {
        return <div>Cartões: Aqui você pode configurar os cartões.</div>;
    };

    const renderActiveDiv = () => {
        switch (activeDiv) {
            case 'categorias':
                return <CategoriaDiv />;
            case 'bancos':
                return <BancosDiv />;
            case 'cartoes':
                return <CartoesDiv />;
            default:
                return <div>Selecione uma opção acima para configurar.</div>; // Mensagem padrão
        }
    };

    return (
        <div className="container">
            <Header />
            <main>
                <div id="cssportal-grid">
                    <div id="botoes">
                        <div id="cssportal-grid-2">
                            <div id="NomeConfiguraçoes">Configuraçoes</div>
                            <div id="Botoes">
                                <button onClick={() => setActiveDiv('categorias')} type="button">Categorias</button>
                                <button onClick={() => setActiveDiv('bancos')} type="button">Bancos</button>
                                <button onClick={() => setActiveDiv('cartoes')} type="button">Cartões</button>
                            </div>
                            <div id="Redefinir">
                                <button type="reset">Redefinir</button>
                            </div>
                        </div>
                    </div>
                    <div id="interface-configuracoes">
                        {renderActiveDiv()} {/* Renderiza a div ativa */}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Configuracoes;
