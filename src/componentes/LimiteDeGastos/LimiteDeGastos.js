import React, { useEffect, useState } from 'react';
import styles from './LimiteDeGastos.module.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


import printer from "../Icones/LimitGast/printer.svg";
import DocPDF from  "../Icones/LimitGast/DocPDF.svg"
import Header from "../Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGasPump, faShoppingCart, faHospital, faUtensils, faCar, faWallet,
    faCreditCard, faTaxi, faHome, faPiggyBank, faBriefcase, faGlobe,
    faBook, faMobileAlt, faTshirt, faPlane, faLaptop, faFilm, faMusic,
    faBicycle, faHeartbeat, faPrescriptionBottle, faCapsules, faClinicMedical,
    faAmbulance, faBus, faTrain, faParking, faRoad, faLightbulb,
    faWater, faFileInvoiceDollar, faCashRegister, faMoneyBillWave,
    faMoneyCheck, faChartLine, faChartPie, faCoins, faHandHoldingUsd,
    faDonate, faStore, faGift, faSubway, faTicketAlt, faCamera,
    faTools, faPhone, faFileAlt, faCoffee, faThumbsUp, faThumbsDown, faSpinner,
    faPlus, faPen
} from '@fortawesome/free-solid-svg-icons';

// Mapeamento de ícones
const iconMap = {
    faGasPump,
    faShoppingCart,
    faHospital,
    faUtensils,
    faCar,
    faWallet,
    faCreditCard,
    faTaxi,
    faHome,
    faPiggyBank,
    faBriefcase,
    faGlobe,
    faBook,
    faMobileAlt,
    faTshirt,
    faPlane,
    faLaptop,
    faFilm,
    faMusic,
    faBicycle,
    faHeartbeat,
    faPrescriptionBottle,
    faCapsules,
    faClinicMedical,
    faAmbulance,
    faBus,
    faTrain,
    faParking,
    faRoad,
    faLightbulb,
    faWater,
    faFileInvoiceDollar,
    faCashRegister,
    faMoneyBillWave,
    faMoneyCheck,
    faChartLine,
    faChartPie,
    faCoins,
    faHandHoldingUsd,
    faDonate,
    faStore,
    faGift,
    faSubway,
    faTicketAlt,
    faCamera,
    faTools,
    faPhone,
    faFileAlt,
    faCoffee,
    faThumbsUp,
    faThumbsDown,
    faSpinner,
    faPlus,
    faPen
};

// Função para calcular a luminância da cor
const calculateBrightness = (hex) => {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return brightness;
};

const handleClick = (mes) => {
    console.log(`Mês selecionado: ${mes}`);
    // Aqui você pode adicionar lógica para atualizar o estado ou realizar outra ação
};

const generatePDF = (dados, ValorTotaldegastos, ValorTotalDeLimiteDeGastos) => {
    if (dados.length === 0) {
        // Exibe uma mensagem caso não haja dados
        alert("Não foi possível gerar o PDF. Não há dados disponíveis.");
        return; // Retorna sem fazer nada se não houver dados
    }

    console.log("Gerando PDF com os seguintes dados:", dados);
    const doc = new jsPDF();

    // Adiciona título ao PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Relatório de Limite de Gastos", 14, 20);

    // Adiciona tabela com os limites de gastos
    const tableData = dados.map(item => [
        item.NomeCategoria,
        `R$ ${item.Valores[0]}`,
        `R$ ${item.Valores[1]}`,
        `${Math.min((item.Valores[0] / item.Valores[1]) * 100, 100).toFixed(1)}%`
    ]);

    doc.autoTable({
        head: [['Categoria', 'Gasto', 'Limite', 'Progresso']],
        body: tableData,
        startY: 30,
        theme: 'striped',
    });

    // Verifica se os valores são válidos para evitar erros no cálculo do progresso
    const progressoTotal = ValorTotalDeLimiteDeGastos > 0
        ? Math.min((ValorTotaldegastos / ValorTotalDeLimiteDeGastos) * 100, 100)
        : 0; // Garante que o progresso total não seja negativo ou indefinido

    doc.setFontSize(12);
    doc.text(`Progresso total de gastos: ${progressoTotal.toFixed(1)}%`, 14, doc.lastAutoTable.finalY + 10);

    // Só desenha o retângulo se o progresso for válido
    if (progressoTotal >= 0 && progressoTotal <= 100) {
        doc.setFillColor(progressoTotal > 100 ? 'red' : '#4CAF50');
        doc.rect(14, doc.lastAutoTable.finalY + 15, progressoTotal * 1.5, 10, 'F');
    }

    // Salvar o PDF com o nome de arquivo "limite_de_gastos.pdf"
    doc.save("limite_de_gastos.pdf");
};




const CardLG = ({ ICO, NomeCategoria, Valores, CorCategoria }) => {
    const [gasto, limite] = Valores;

    // Calcular o progresso, limitando a 100%
    const progresso = (gasto === 0 && limite === 0) ? 0 : Math.min((gasto / limite) * 100, 100);

    // Calcular a luminância da cor da categoria para ajustar a cor do ícone
    const brightness = calculateBrightness(CorCategoria);
    const iconColor = brightness > 128 ? 'black' : 'white';

    return (
        <div className={styles.CardLGMain03BodyContent}>
            <div
                className={styles.CardLGMain03BodyContentICO}
                style={{
                    border: 'black',
                    borderRadius: '20%',
                    backgroundColor: CorCategoria
                }}
            >
                <FontAwesomeIcon
                    icon={iconMap[ICO]}
                    style={{
                        fontSize: '150%',
                        color: iconColor
                    }}
                />
            </div>
            <div className={styles.CardLGMain03BodyContentProgressbarCatExp}>
                <div className={styles.ProgressbarCatExpI}>
                    <div className={styles.ProgressbarCatExpInter}>
                        <div className={styles.CardCatP}>
                            <div
                                className={styles.CardCatProgressbar}
                                style={{
                                    width: `${progresso}%`,  // Define a largura com base no progresso
                                    backgroundColor: gasto > limite ? 'red' : CorCategoria  // Verifica se o gasto ultrapassou o limite para mudar a cor para vermelho
                                }}
                            >
                                {progresso > 0 && progresso < 100 ? `${progresso.toFixed(1)}%` : null}
                            </div>
                        </div>
                    </div>
                    <div className={styles.ProgressbarCatExpInterNomeCategoria}>{NomeCategoria}</div>
                    <div className={styles.ProgressbarCatExpInterValores}>
                        {gasto === 0 && limite === 0 ? '\u00A0\u00A0' : `R$ ${Valores[0]} de R$ ${Valores[1]}`}
                    </div>
                </div>
            </div>
            <div className={styles.CardLGMain03BodyContentButtons}>
                {gasto === 0 && limite === 0 ? (
                    <button className={styles.ButtonAdd}>
                        <FontAwesomeIcon icon={faPlus} style={{ fontSize: '20px' }} />
                    </button>
                ) : (
                    <button className={styles.ButtonEdit}>
                        <FontAwesomeIcon icon={faPen} style={{ fontSize: '20px' }} />
                    </button>
                )}
            </div>
        </div>
    );
};


const LimiteGastos = () => {
    const [year, setYear] = useState(new Date().getFullYear()); // Estado para o ano atual
    const [month, setMonth] = useState(new Date().getMonth()); // Estado para o mês atual
    const [dados, setDados] = useState([]);


    // Função para formatar o mês
    const formatMonth = (monthIndex) => {
        const months = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];
        return months[monthIndex];
    };

    // Função para abrir a impressão diretamente
    const printPDF = (dados, ValorTotaldegastos, ValorTotalDeLimiteDeGastos) => {
        const doc = new jsPDF();

        // Adiciona título ao PDF
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("Relatório de Limite de Gastos", 14, 20);

        // Adiciona tabela com os limites de gastos
        const tableData = dados.map(item => [
            item.NomeCategoria,
            `R$ ${item.Valores[0]}`,
            `R$ ${item.Valores[1]}`,
            `${Math.min((item.Valores[0] / item.Valores[1]) * 100, 100).toFixed(1)}%`
        ]);

        doc.autoTable({
            head: [['Categoria', 'Gasto', 'Limite', 'Progresso']],
            body: tableData,
            startY: 30,
            theme: 'striped',
        });

        // Adiciona gráfico de progresso total
        const progressoTotal = Math.min(
            (ValorTotaldegastos / ValorTotalDeLimiteDeGastos) * 100,
            100
        );

        doc.setFontSize(12);
        doc.text(`Progresso total de gastos: ${progressoTotal.toFixed(1)}%`, 14, doc.lastAutoTable.finalY + 10);

        doc.setFillColor(progressoTotal > 100 ? 'red' : '#4CAF50');
        doc.rect(14, doc.lastAutoTable.finalY + 15, progressoTotal * 1.5, 10, 'F');

        // Imprimir diretamente o PDF gerado
        doc.autoPrint();
        window.open(doc.output('bloburl'), '_blank');
    };

    const ValorTotaldegastos = dados.reduce((acc, item) => acc + item.Valores[0], 0);
    const ValorTotalDeLimiteDeGastos = dados.reduce((acc, item) => acc + item.Valores[1], 0);


    const decrementYear = () => setYear(year - 1); // Função para diminuir o ano
    const incrementYear = () => setYear(year + 1); // Função para aumentar o ano

    const progressoTotal = Math.min(
        (ValorTotaldegastos / ValorTotalDeLimiteDeGastos) * 100,
        100  // Limita a barra a 100% mesmo se o gasto ultrapassar o limite
    );



    useEffect(() => {
        const fetchData = async () => {
            // Aqui vamos formatar o mês e ano para comparar com os dados
            const mesAnoSelecionado = `${String(month + 1).padStart(2, '0')}-${year}`;

            // Filtrando os dados com base no mesAno
            const jsonData = [
                { ICO: 'faGasPump', NomeCategoria: 'Combustível', Valores: [500, 1000], CorCategoria: '#8e402f', mesAno: '11-2024' },
                { ICO: 'faShoppingCart', NomeCategoria: 'Compras', Valores: [200, 600], CorCategoria: '#1f8c32', mesAno: '11-2024' },
                { ICO: 'faHospital', NomeCategoria: 'Saúde', Valores: [300, 800], CorCategoria: '#2a3c98', mesAno: '12-2024' },
                { ICO: 'faHospital', NomeCategoria: 'Saúde', Valores: [0, 0], CorCategoria: '#2a3c98', mesAno: '01-2025' },
            ];

            // Filtra os dados que correspondem ao mês e ano selecionado
            const dadosFiltrados = jsonData.filter(item => item.mesAno === mesAnoSelecionado);

            setDados(dadosFiltrados);
        };

        fetchData();
    }, [month, year]);




    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.LGMain}>
                <div className={styles.LGMain01}>Limites de gastos</div>
                <div className={styles.LGMain02}>
                    <div className={styles.LGMain01BodyCalendariobody}>
                        <div className={styles.LGMain01BodyCalendarioAno}>
                            <button type="button" onClick={decrementYear} className={styles.arrowButton}>↞</button>
                            <button type="button" className={styles.yearButton}>{year}</button>
                            <button type="button" onClick={incrementYear}
                                    className={`${styles.arrowButton} ${styles.arrowButtonRight}`}>↠
                            </button>
                        </div>
                        {/* Exibindo os meses */}
                        <div
                            className={`${styles.LGMain01BodyCalendarioMes01} ${month === 0 ? styles.selectedMonth : ''}`}
                            onClick={() => setMonth(0)}>Jan
                        </div>
                        <div
                            className={`${styles.LGMain01BodyCalendarioMes02} ${month === 1 ? styles.selectedMonth : ''}`}
                            onClick={() => setMonth(1)}>Fev
                        </div>
                        <div
                            className={`${styles.LGMain01BodyCalendarioMes03} ${month === 2 ? styles.selectedMonth : ''}`}
                            onClick={() => setMonth(2)}>Mar
                        </div>
                        <div
                            className={`${styles.LGMain01BodyCalendarioMes04} ${month === 3 ? styles.selectedMonth : ''}`}
                            onClick={() => setMonth(3)}>Abr
                        </div>
                        <div
                            className={`${styles.LGMain01BodyCalendarioMes05} ${month === 4 ? styles.selectedMonth : ''}`}
                            onClick={() => setMonth(4)}>Mai
                        </div>
                        <div
                            className={`${styles.LGMain01BodyCalendarioMes06} ${month === 5 ? styles.selectedMonth : ''}`}
                            onClick={() => setMonth(5)}>Jun
                        </div>
                        <div
                            className={`${styles.LGMain01BodyCalendarioMes07} ${month === 6 ? styles.selectedMonth : ''}`}
                            onClick={() => setMonth(6)}>Jul
                        </div>
                        <div
                            className={`${styles.LGMain01BodyCalendarioMes08} ${month === 7 ? styles.selectedMonth : ''}`}
                            onClick={() => setMonth(7)}>Ago
                        </div>
                        <div
                            className={`${styles.LGMain01BodyCalendarioMes09} ${month === 8 ? styles.selectedMonth : ''}`}
                            onClick={() => setMonth(8)}>Set
                        </div>
                        <div
                            className={`${styles.LGMain01BodyCalendarioMes10} ${month === 9 ? styles.selectedMonth : ''}`}
                            onClick={() => setMonth(9)}>Out
                        </div>
                        <div
                            className={`${styles.LGMain01BodyCalendarioMes11} ${month === 10 ? styles.selectedMonth : ''}`}
                            onClick={() => setMonth(10)}>Nov
                        </div>
                        <div
                            className={`${styles.LGMain01BodyCalendarioMes12} ${month === 11 ? styles.selectedMonth : ''}`}
                            onClick={() => setMonth(11)}>Dez
                        </div>
                    </div>
                </div>
                <div className={styles.LGMain03}>
                    <div className={styles.LGMain03Body}>
                        <div className={styles.LGMain03BodyContentGrafic}>
                            <div className={styles.LGMain03BodyContentGraficBody}>
                                <div className={styles.LGMain03BodyContentGraficBodycontent}>
                                    <div className={styles.LGMain03BodyContentB}>
                                        <div className={styles.LGMain03BodyContentBlank01}></div>
                                        <div className={styles.LGMain03BodyContentBlank02}></div>
                                        <div className={styles.LGMain03BodyContentBlank03}></div>
                                        <div className={styles.LGMain03BodyContentBlank04}></div>
                                        <div className={styles.LGMain03BodyContentTitle}>
                                            <div>Despesa</div>
                                            <div>{`R$ ${ValorTotaldegastos} de R$ ${ValorTotalDeLimiteDeGastos}`}</div>
                                        </div>
                                        <div className={styles.LGMain03BodyContentProgressbar}>
                                            <div className={styles.ContentProgressbarT}>
                                                <div
                                                    className={styles.ContentProgressbarTotal}
                                                    style={{
                                                        width: `${Math.min(progressoTotal, 100)}%`, // Garante que a largura não ultrapasse 100%
                                                        backgroundColor: ValorTotaldegastos > ValorTotalDeLimiteDeGastos ? 'red' : '#4CAF50',  // Altera a cor para vermelho quando ultrapassar o limite
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        padding: '0 10px'
                                                    }}
                                                >
                                                    {progressoTotal > 0 && progressoTotal < 100 ? `${progressoTotal.toFixed(1)}%` : null}
                                                    {progressoTotal >= 100 && `${progressoTotal.toFixed(1)}%`} {/* Exibe a porcentagem mesmo se for maior que 100 */}
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.LGMain03BodyContentGraficBodyTitle}>
                                    {`${formatMonth(month)} de ${year}`}
                                </div>
                                <div className={styles.LGMain03BodyContentGraficBodyIMP}>
                                    <div className={styles.LGMain03BodyContentGraficB}>
                                    </div>
                                </div>
                                <div className={styles.LGMain03BodyContentGraficBodyPDF}>
                                    <div className={styles.LGMain03BodyContentGraficBodyPDF}>
                                        <div
                                            className={styles.LGMain03BodyContentGraficButton}
                                            onClick={() => {
                                                console.log("Div clicada");
                                                generatePDF(dados, ValorTotaldegastos, ValorTotalDeLimiteDeGastos);
                                            }}
                                        >
                                            <img
                                                src={DocPDF}
                                                alt="Ícone de Limite de Gastos"
                                                className={styles.iconbuttonsLG}
                                            />
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className={styles.LGMain03BodyContent}>
                            {dados.length === 0 ? (
                                <div className={styles.noDataMessage}>Não há limite de contas para este mês.</div>  // Exibe a mensagem quando não há dados
                            ) : (
                                dados.map((item, index) => (
                                    <CardLG
                                        key={index}
                                        ICO={item.ICO}
                                        NomeCategoria={item.NomeCategoria}
                                        Valores={item.Valores}
                                        CorCategoria={item.CorCategoria}
                                    />
                                ))
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LimiteGastos;
