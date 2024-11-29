import React, { useState } from 'react';
import styles from './AtivosINV.module.css';
import MenuInvest from '../../Popup/MenuInvestimentos/MenuInvest';
import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts';
import plus from "../Icones_ATV/plus.svg";
import { Typography } from '@mui/material';

// Função para gerar uma cor HSL fria aleatória
const generateCoolColor = () => {
    const randomHue = Math.floor(Math.random() * 60) + 180; // 180° a 240° (azul a violeta)
    const saturation = 70 + Math.floor(Math.random() * 30); // 70% a 100%
    const lightness = 30 + Math.floor(Math.random() * 40); // 30% a 70%
    return `hsl(${randomHue}, ${saturation}%, ${lightness}%)`;
};

// Função para gerar uma cor única para cada ativo
const generateUniqueColor = (usedColors, ativoNome) => {
    let color;
    // Continua gerando cores até encontrar uma que não tenha sido usada
    do {
        color = generateCoolColor();
    } while (usedColors.has(color)); // Verifica se a cor já foi usada
    usedColors.set(ativoNome, color); // Armazena a cor com o nome do ativo
    return color; // Retorna a nova cor única
};

// Componente do gráfico de pizza
const PieAnimation = ({ ativos }) => {
    const [radius] = useState(60);
    const usedColors = new Map(); // Mapeia o nome do ativo para a cor usada

    // Calcular a soma dos valores
    const totalValue = ativos.reduce((acc, ativo) => acc + ativo.valor, 0);

    return (
        <Box sx={{ width: '80%', margin: '0 auto' }}>
            <PieChart
                height={200}
                series={[{
                    data: ativos.map((ativo) => ({
                        id: ativo.nome,
                        label: ativo.nome,
                        value: ativo.valor,
                        color: generateUniqueColor(usedColors, ativo.nome), // Atribui a cor única para o gráfico
                    })),
                    innerRadius: radius,
                    arcLabel: null,
                    arcLabelMinAngle: 20,
                }]}
            />

            <Box sx={{ marginTop: 2 }}>
                {ativos.map((ativo) => {
                    const percentage = ((ativo.valor / totalValue) * 100).toFixed(2);
                    const color = usedColors.get(ativo.nome); // Obtém a cor armazenada para o ativo
                    return (
                        <Box key={ativo.nome} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                            <Box
                                sx={{
                                    width: 16,
                                    height: 16,
                                    backgroundColor: color, // Usando a cor já gerada
                                    marginRight: 1,
                                }}
                            />
                            <Typography variant="body1">
                                {ativo.nome}: {percentage}%
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

// Componente principal
const AtivoINVC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [ativos, setAtivos] = useState([
        { nome: 'Ação A', banco: 'Banco A', saldoBruto: 'R$ 1.500', rentabilidade: '12%', percentual: '20%', categoria: 'Ações' },
        { nome: 'Fundo B', banco: 'Banco B', saldoBruto: 'R$ 3.000', rentabilidade: '8%', percentual: '25%', categoria: 'Fundos' },
        { nome: 'Cripto C', banco: 'Crypto Bank', saldoBruto: 'R$ 500', rentabilidade: '25%', percentual: '10%', categoria: 'Criptomoedas' }
    ]);
    const [novoAtivo, setNovoAtivo] = useState({ nome: '', valor: '' });

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoAtivo({ ...novoAtivo, [name]: value });
    };

    const handleAddAtivo = () => {
        if (novoAtivo.nome && novoAtivo.valor) {
            setAtivos([...ativos, { ...novoAtivo, valor: parseFloat(novoAtivo.valor) }]);
            setNovoAtivo({ nome: '', valor: '' });
        }
    };

    // Função para gerar os cartões dinamicamente
    const createAtivoCard = (ativo) => {
        return (
            <div className={styles.cssportalgridCard} key={ativo.nome}>
                <div className={styles.AtivoCardTitle}>
                    {ativo.nome} - {ativo.banco}
                </div>
                <div className={styles.AtivoCardSaldoBruto}>
                    {ativo.saldoBruto}
                </div>
                <div className={styles.AtivoCardRentabilidade}>
                    {ativo.rentabilidade}
                </div>
                <div className={styles.AtivoCardPercentual}>
                    {ativo.percentual}
                </div>
                <div className={styles.AtivoCardBlank2}></div>
                <div className={styles.AtivoCardBlank1}></div>
                <div className={styles.AtivoCardCategoria}>
                    {ativo.categoria}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.cssportalGridAtivos1}>
                {/* Seção Principal */}
                <div className={styles.ativosMain}>
                    <div className={styles.cssportalGridAtivos2}>
                        <div className={styles.ativosMainTitle}>
                            <div className={styles.AtivosTitle}>Ativos</div>
                            - {ativos.length} ativos em carteira
                        </div>
                        <div className={styles.ativosMainButton1}>
                            <button type="submit" className={styles.ButtonCadCategorias}>
                                <img src={plus} alt="Mais" className={styles.icon} />
                                Categoria
                            </button>
                        </div>
                        <div className={styles.ativosMainButton2}>
                            <button type="button" onClick={toggleExpansion} className={styles.ButtonCadAtivos}>
                                <img src={plus} alt="Mais" className={styles.icon} />
                                Ativos
                            </button>
                            <MenuInvest isExpanded={isExpanded} toggleExpansion={toggleExpansion} />
                        </div>
                    </div>
                </div>

                {/* Formulário para adicionar novo ativo */}
                <div className={styles.addAtivoForm}>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome do Ativo"
                        value={novoAtivo.nome}
                        onChange={handleInputChange}
                        className={styles.inputNome}
                    />
                    <input
                        type="number"
                        name="valor"
                        placeholder="Valor do Ativo"
                        value={novoAtivo.valor}
                        onChange={handleInputChange}
                        className={styles.inputValor}
                    />
                    <button onClick={handleAddAtivo} className={styles.ButtonAddAtivo}>
                        Adicionar Ativo
                    </button>
                </div>

                {/* Seção do Corpo 1 */}
                <div className={styles.ativosBody1}>
                    <div className={styles.cssportalGridAtivos3}>
                        <div className={styles.ativosBody1Title}>Alocação de Carteira</div>
                        <div className={styles.ativosBody1Grafic}>
                            <PieAnimation ativos={ativos} />
                        </div>
                    </div>
                </div>

                {/* Seção do Corpo 2 */}
                <div className={styles.ativosBody2}>
                    <div className={styles.cssportalGridAtivos4}>
                        <div className={styles.ativosBody2CaixaTextoBusca}>
                            <input
                                style={{ backgroundColor: '#D9D9D9' }}
                                className={styles.InputAtivos}
                                type="text"
                                placeholder="Buscar Ativos"
                            />
                        </div>
                        <div className={styles.ativosBody2TitleBusca}>
                            Buscar Ativos
                        </div>
                        <div className={styles.ativosBody2TitleFiltro}>
                            Filtrar por categoria
                        </div>
                        <div className={styles.ativosBody2CaixaTextoFiltro}>
                            <div className={styles.ativosBody2CaixaTextoFiltro}>
                                <div className={styles.InputAtivosWrapper}>
                                    <select className={styles.InputAtivos}>
                                        <option value="">Selecione uma categoria</option>
                                        <option value="Ações">Ações</option>
                                        <option value="Fundos">Fundos</option>
                                        <option value="Criptomoedas">Criptomoedas</option>
                                        <option value="Renda Fixa">Renda Fixa</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className={styles.ativosBody2List} style={{ overflowY: 'auto', height: '500px' }}>
                            {/* Gerar dinamicamente os cards com os dados dos ativos */}
                            {ativos.map(createAtivoCard)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AtivoINVC;
