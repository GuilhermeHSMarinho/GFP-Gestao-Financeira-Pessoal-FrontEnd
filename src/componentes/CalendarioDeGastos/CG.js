import React, { useState, useEffect, useContext } from 'react';
import Header from '../Header';
import styles from './CG.module.css';
import { AuthContext } from '../segurança/JWT/AuthContext';
import { FiEdit } from 'react-icons/fi'; // Ícone de edição
import { FiCheck } from 'react-icons/fi'; // Ícone de checkmark

// Função para gerar os dias de um mês específico
const generateDaysOfMonth = (month, year) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    while (days.length < 42) {
        days.push(null);
    }

    return days;
};

// Componente para exibir cada card de despesa
const Card = ({ nome, situacao, valor }) => {
    return (
        <div className={styles.CardCG}>
            <div className={styles.CardCGNome}>{nome}</div>
            <div className={styles.CardCGSituacao}>{situacao}</div>
            <div className={styles.CardCGValor}>R$ {valor.toFixed(2)}</div>
            <div className={styles.CardCGBlank}></div>
            <div className={styles.CardCGEdt}>
                <FiEdit />
            </div>
            <div className={styles.CardCGDefPago}>
                <FiCheck />
            </div>
        </div>
    );
};

// Array de nomes dos dias da semana
const dayNames = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];

const CG = () => {
    // Mapeamento de meses
    const months = {
        Jan: 1, Fev: 2, Mar: 3, Abr: 4, Mai: 5, Jun: 6,
        Jul: 7, Ago: 8, Set: 9, Out: 10, Nov: 11, Dez: 12
    };

    const monthNames = Object.keys(months);
    const currentDate = new Date();

    // Estados iniciais
    const [selectedMonth, setSelectedMonth] = useState(monthNames[currentDate.getMonth()]);
    const [year, setYear] = useState(currentDate.getFullYear());
    const [clickedDay, setClickedDay] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [despesas, setDespesas] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        // Inicializar com a data atual
        const today = currentDate.getDate();
        const dayOfWeek = dayNames[currentDate.getDay()];
        const monthName = monthNames[currentDate.getMonth()];
        setClickedDay(today - 1 + new Date(year, currentDate.getMonth(), 1).getDay());
        setSelectedDate(`${dayOfWeek}, ${today} de ${monthName} de ${year}`);
    }, [year]);

    const fetchDespesas = async (ano, mes, dia) => {
        try {
            const response = await fetch(`http://localhost:5000/api/gfp/calendario/${ano}/${mes}/${dia}`, {
                method: 'GET',
                headers: {
                    'HTTP-KEY': 'aad2401f387317ee0eb633163a409eb90b8fb9bb92fe3b2aa65aee0100e0c85e',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setDespesas(data.despesas_detalhadas);
            } else {
                console.error('Erro ao buscar despesas:', response.status);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    const handleMonthClick = (month) => {
        setSelectedMonth(month);
    };

    const incrementYear = () => {
        setYear(year + 1);
    };

    const decrementYear = () => {
        setYear(year - 1);
    };

    const handleDayClick = (index, day) => {
        if (day !== null) {
            setClickedDay(index);

            const currentMonthIndex = months[selectedMonth] - 1;
            const selectedDateObj = new Date(year, currentMonthIndex, day);
            const dayName = dayNames[selectedDateObj.getDay()];
            const monthName = selectedMonth;
            setSelectedDate(`${dayName}, ${day} de ${monthName} de ${year}`);

            // Buscar despesas detalhadas
            fetchDespesas(year, months[selectedMonth], day);
        }
    };

    const currentMonthIndex = selectedMonth ? months[selectedMonth] - 1 : -1;
    const daysOfMonth = selectedMonth ? generateDaysOfMonth(months[selectedMonth], year) : [];

    return (
        <div className="container">
            <Header />
            <div className={styles.cssportalgridCalMain}>
                <div className={styles.CalGMain1}>
                    <div className={styles.cssportalgridCalGDay}>
                        {daysOfMonth.map((day, index) => {
                            const isCurrentMonth = day !== null;
                            const dayOfWeek = index % 7;

                            return (
                                <div
                                    key={index}
                                    className={`${styles[`CalGDay${index + 1}`]} ${clickedDay === index ? styles.clicked : ''}`}
                                    style={{
                                        backgroundColor: isCurrentMonth ? '' : '#C2C2C2',
                                        cursor: day !== null ? 'pointer' : 'default',
                                    }}
                                    onClick={() => handleDayClick(index, day)}
                                >
                                    <div className={styles.dayName}>
                                        {dayNames[dayOfWeek].substring(0, 3)}
                                    </div>
                                    <div className={styles.dayNumber}>
                                        {day || ''}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.CalGMain2}>
                    <div className={styles.CalGMain2Main}>
                        <div className={styles.CalGMain2Into}>
                            <div className={styles.CalGMain2I}>
                                <div className={styles.CalGMain2Into01}>
                                    {selectedDate || 'Selecione uma data no calendário'}
                                </div>
                                <div className={styles.CalGMain2Into02}>
                                    {despesas.length > 0 ? (
                                        despesas.map((despesa, index) => (
                                            <Card
                                                key={index}
                                                nome={despesa.nome_conta}
                                                situacao={despesa.situacao}
                                                valor={despesa.valor}
                                            />
                                        ))
                                    ) : (
                                        <p>Nenhuma despesa encontrada.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.CalGMain3}>
                    <div className={styles.cssportalgridCalMain3}>
                        <div className={styles.CalMain3Blank}></div>
                        <div className={styles.CalMain3SelMes}>
                            <div className={styles.cssportalgridCalMain3Dentro}>
                                <div className={styles.CalMain3SelMesano}>
                                    <button type="button" onClick={decrementYear} className={styles.arrowButton}>↞</button>
                                    <button type="button" className={styles.yearButton}>{year}</button>
                                    <button type="button" onClick={incrementYear} className={`${styles.arrowButton} ${styles.arrowButtonRight}`}>↠</button>
                                </div>
                                <div className={styles.CalMain3SelecionarMes}>
                                    <div className={styles.monthRow}>
                                        {monthNames.slice(0, 6).map((month, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => handleMonthClick(month)}
                                                className={`${styles.monthButton} ${selectedMonth === month ? styles.selectedMonth : ''}`}
                                            >
                                                {month}
                                            </button>
                                        ))}
                                    </div>
                                    <div className={styles.monthRow}>
                                        {monthNames.slice(6).map((month, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => handleMonthClick(month)}
                                                className={`${styles.monthButton} ${selectedMonth === month ? styles.selectedMonth : ''}`}
                                            >
                                                {month}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CG;
