'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Page() {
    const [activeTab, setActiveTab] = useState('dashboard');
    // const [alerts, setAlerts] = useState([
    //     {
    //         id: 1,
    //         type: 'warning',
    //         message: 'Превышение уровня CO2 в аудитории 102 корпуса №1',
    //         time: '10:23',
    //     },
    //     {
    //         id: 2,
    //         type: 'danger',
    //         message: 'Критический уровень загрязнения воздуха в лаборатории 204 корпуса №1',
    //         time: '09:15',
    //     },
    //     {
    //         id: 3,
    //         type: 'warning',
    //         message: 'Повышенный уровень шума в аудитории 305 корпуса №1',
    //         time: '11:30',
    //     },
    // ]);

    const airQualityData = [10, 20, 40, 30, 50, 70, 90, 85, 40, 30, 20, 10];
    const waterQualityData = [80, 90, 85, 75, 60, 65, 70, 85, 90, 85, 80, 85];
    const noiseData = [30, 40, 35, 45, 55, 40, 35, 30, 45, 50, 45, 30];
    const months = [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
    ];

    const normativeDocuments = [
        {
            id: 1,
            title: 'СанПиН 2.1.3684-21',
            description: 'Санитарно-эпидемиологические требования к содержанию территорий',
            date: '28.01.2021',
        },
        {
            id: 2,
            title: 'ГОСТ Р 58577-2019',
            description: 'Правила установления нормативов допустимых выбросов загрязняющих веществ',
            date: '15.10.2019',
        },
        {
            id: 3,
            title: 'СанПиН 1.2.3685-21',
            description: 'Гигиенические нормативы и требования к обеспечению безопасности',
            date: '28.01.2021',
        },
    ];

    const measurementData = [
        {
            id: 1,
            sensor: 'Alphasense CO-A4',
            location: 'Перекресток',
            parameter: 'CO',
            value: '9.2 мг/м³',
            norm: '5 мг/м³',
            status: 'danger',
        },
        {
            id: 2,
            sensor: 'Alphasense CO-A4',
            location: 'Въезд 1',
            parameter: 'CO',
            value: '4.8 мг/м³',
            norm: '5 мг/м³',
            status: 'normal',
        },
        {
            id: 3,
            sensor: 'Alphasense NO2-A1',
            location: 'Внутренний двор',
            parameter: 'NO₂',
            value: '0.12 мг/м³',
            norm: '0.2 мг/м³',
            status: 'normal',
        },
        {
            id: 4,
            sensor: 'Alphasense NO2-A1',
            location: 'Дорога',
            parameter: 'NO₂',
            value: '0.22 мг/м³',
            norm: '0.2 мг/м³',
            status: 'warning',
        },
        {
            id: 5,
            sensor: 'Plantower PMS5003',
            location: 'Крыша',
            parameter: 'PM₂.₅/PM₁₀',
            value: '75 мкг/м³',
            norm: '50 мкг/м³',
            status: 'danger',
        },
        {
            id: 6,
            sensor: 'Plantower PMS5003',
            location: 'Въезд 2',
            parameter: 'PM₂.₅/PM₁₀',
            value: '42 мкг/м³',
            norm: '50 мкг/м³',
            status: 'normal',
        },
    ];

    // Имитация данных для графиков
    const coData = [4.8, 5.2, 6.1, 7.0, 8.5, 9.2, 7.8, 6.5, 5.0, 4.8];
    const no2Data = [0.12, 0.15, 0.18, 0.19, 0.22, 0.20, 0.18, 0.16, 0.14, 0.12];
    const pmData = [42, 50, 55, 60, 65, 75, 70, 60, 50, 42];
    const timeLabels = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

    // Новые предупреждения
    const alerts = [
        {
            id: 1,
            type: 'danger',
            message: 'Критический уровень CO на Перекрестке',
            time: '14:10',
        },
        {
            id: 2,
            type: 'warning',
            message: 'Превышение NO₂ на Дороге',
            time: '13:45',
        },
        {
            id: 3,
            type: 'danger',
            message: 'Высокий уровень PM₂.₅/PM₁₀ на Крыше',
            time: '13:20',
        },
    ];

    // Данные для графиков Chart.js
    const coChartData = {
        labels: timeLabels,
        datasets: [
            {
                label: 'CO (мг/м³)',
                data: coData,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.4,
            },
        ],
    };
    const no2ChartData = {
        labels: timeLabels,
        datasets: [
            {
                label: 'NO₂ (мг/м³)',
                data: no2Data,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.4,
            },
        ],
    };
    const pmChartData = {
        labels: timeLabels,
        datasets: [
            {
                label: 'PM₂.₅/PM₁₀ (мкг/м³)',
                data: pmData,
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                tension: 0.4,
            },
        ],
    };
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: true, position: 'top' as const },
            title: { display: false },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Header */}
            <header className="bg-green-700 text-white shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.5"
                            />
                        </svg>
                        <h1 className="text-xl font-bold">ЭкоМониторинг корпуса №1 НИУ БелГУ</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button className="flex items-center space-x-1 bg-green-600 hover:bg-green-800 px-3 py-2 rounded-md transition">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                                <span className="text-sm font-medium">Уведомления</span>
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {alerts.length}
                                </span>
                            </button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold cursor-pointer"
                                onClick={() => window.location.href = '/login'}>
                                А
                            </div>
                            <span className="text-sm cursor-pointer" onClick={() => window.location.href = '/login'}>Администратор</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex space-x-1">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`px-4 py-3 text-sm font-medium ${activeTab === 'dashboard' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500 hover:text-green-700'}`}
                        >
                            Панель мониторинга
                        </button>
                        <button
                            onClick={() => setActiveTab('map')}
                            className={`px-4 py-3 text-sm font-medium ${activeTab === 'map' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500 hover:text-green-700'}`}
                        >
                            Карта объектов
                        </button>
                        <button
                            onClick={() => setActiveTab('data')}
                            className={`px-4 py-3 text-sm font-medium ${activeTab === 'data' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500 hover:text-green-700'}`}
                        >
                            Данные измерений
                        </button>
                        <button
                            onClick={() => setActiveTab('normative')}
                            className={`px-4 py-3 text-sm font-medium ${activeTab === 'normative' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500 hover:text-green-700'}`}
                        >
                            Нормативная база
                        </button>
                        <button
                            onClick={() => setActiveTab('alerts')}
                            className={`px-4 py-3 text-sm font-medium ${activeTab === 'alerts' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500 hover:text-green-700'}`}
                        >
                            Настройки оповещений
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                {/* Dashboard */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* График CO */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium">Угарный газ</h3>
                                    <span className="text-yellow-500 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium">
                                        {Math.max(...coData) > 5 ? 'Внимание' : 'Норма'}
                                    </span>
                                </div>
                                <Line data={coChartData} options={chartOptions} height={180} />
                            </div>
                            {/* График NO2 */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium">Диоксид азота</h3>
                                    <span className="text-yellow-500 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium">
                                        {Math.max(...no2Data) > 0.2 ? 'Внимание' : 'Норма'}
                                    </span>
                                </div>
                                <Line data={no2ChartData} options={chartOptions} height={180} />
                            </div>
                            {/* График PM2.5/PM10 */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium">Мелкодисперсная пыль</h3>
                                    <span className="text-yellow-500 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium">
                                        {Math.max(...pmData) > 50 ? 'Внимание' : 'Норма'}
                                    </span>
                                </div>
                                <Line data={pmChartData} options={chartOptions} height={180} />
                            </div>
                        </div>
                        {/* Таблица измерений по датчикам */}
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium">Последние измерения</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Датчик</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Локация</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Параметр</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Значение</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Норма</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {measurementData.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.sensor}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.parameter}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.value}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.norm}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${item.status === 'normal' ? 'bg-green-100 text-green-800' : item.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{item.status === 'normal' ? 'Норма' : item.status === 'warning' ? 'Внимание' : 'Опасность'}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Активные предупреждения */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-medium mb-4">Активные предупреждения</h3>
                            <div className="space-y-3">
                                {alerts.map((alert) => (
                                    <div key={alert.id} className={`p-4 rounded-lg flex items-start space-x-3 ${alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
                                        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${alert.type === 'warning' ? 'bg-yellow-100 text-yellow-500' : 'bg-red-100 text-red-500'}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <h4 className={`font-medium ${alert.type === 'warning' ? 'text-yellow-800' : 'text-red-800'}`}>{alert.type === 'warning' ? 'Предупреждение' : 'Критическая ситуация'}</h4>
                                                <span className="text-sm text-gray-500">{alert.time}</span>
                                            </div>
                                            <p className="text-sm mt-1">{alert.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Map */}
                {activeTab === 'map' && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-medium mb-4">Карта объектов</h2>
                        <div className="flex items-center justify-center">
                            <Image src="/images/карта.png" alt="Карта объектов" width={1200} height={800} className="rounded-lg border shadow" />
                        </div>
                    </div>
                )}

                {/* Data */}
                {activeTab === 'data' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-lg font-medium">Данные измерений</h3>
                                <div className="flex space-x-2">
                                    <select className="border border-gray-300 rounded-md text-sm px-3 py-1.5">
                                        <option>Все датчики</option>
                                        <option>Alphasense CO-A4</option>
                                        <option>Alphasense NO2-A1</option>
                                        <option>Plantower PMS5003</option>
                                    </select>
                                    <select className="border border-gray-300 rounded-md text-sm px-3 py-1.5">
                                        <option>Все локации</option>
                                        <option>Перекресток</option>
                                        <option>Внутренний двор</option>
                                        <option>Крыша</option>
                                        <option>Въезд 1</option>
                                        <option>Въезд 2</option>
                                        <option>Дорога</option>
                                    </select>
                                    <select className="border border-gray-300 rounded-md text-sm px-3 py-1.5">
                                        <option>Все параметры</option>
                                        <option>CO</option>
                                        <option>NO₂</option>
                                        <option>PM₂.₅/PM₁₀</option>
                                    </select>
                                    <button className="bg-green-600 text-white rounded-md text-sm px-3 py-1.5 hover:bg-green-700">Экспорт</button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Датчик</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Локация</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Параметр</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Значение</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Норма</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата измерения</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {measurementData.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.sensor}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.parameter}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.value}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.norm}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${item.status === 'normal' ? 'bg-green-100 text-green-800' : item.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{item.status === 'normal' ? 'Норма' : item.status === 'warning' ? 'Внимание' : 'Опасность'}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15.05.2023 14:30</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                                <div className="text-sm text-gray-700">Показано <span className="font-medium">6</span> из <span className="font-medium">6</span> записей</div>
                                <div className="flex space-x-1">
                                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">Назад</button>
                                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 font-medium text-green-700">1</button>
                                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">Вперед</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Normative */}
                {activeTab === 'normative' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-lg font-medium">Нормативная база</h3>
                                <button className="bg-green-600 text-white rounded-md text-sm px-3 py-1.5 hover:bg-green-700 flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                    Добавить документ
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Номер документа
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Описание
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Дата
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Действия
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {normativeDocuments.map((doc) => (
                                            <tr key={doc.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-700">
                                                    {doc.title}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {doc.description}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {doc.date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex space-x-2">
                                                        <button className="text-blue-600 hover:text-blue-800">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                />

                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <button className="text-gray-600 hover:text-gray-800">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Alerts */}
                {activeTab === 'alerts' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-medium mb-4">Настройка сигнализации</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium text-gray-700 mb-3">
                                        Параметры оповещения
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Способы оповещения
                                            </label>
                                            <div className="space-y-2">
                                                <div className="flex items-center">
                                                    <input
                                                        id="email"
                                                        name="notification"
                                                        type="checkbox"
                                                        className="h-4 w-4 text-green-600 border-gray-300 rounded"
                                                        defaultChecked
                                                    />

                                                    <label
                                                        htmlFor="email"
                                                        className="ml-2 block text-sm text-gray-700"
                                                    >
                                                        Email
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        id="sms"
                                                        name="notification"
                                                        type="checkbox"
                                                        className="h-4 w-4 text-green-600 border-gray-300 rounded"
                                                        defaultChecked
                                                    />

                                                    <label
                                                        htmlFor="sms"
                                                        className="ml-2 block text-sm text-gray-700"
                                                    >
                                                        SMS
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        id="system"
                                                        name="notification"
                                                        type="checkbox"
                                                        className="h-4 w-4 text-green-600 border-gray-300 rounded"
                                                        defaultChecked
                                                    />

                                                    <label
                                                        htmlFor="system"
                                                        className="ml-2 block text-sm text-gray-700"
                                                    >
                                                        Системные уведомления
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Уровень важности
                                            </label>
                                            <div className="space-y-2">
                                                <div className="flex items-center">
                                                    <input
                                                        id="warning"
                                                        name="importance"
                                                        type="checkbox"
                                                        className="h-4 w-4 text-green-600 border-gray-300 rounded"
                                                        defaultChecked
                                                    />

                                                    <label
                                                        htmlFor="warning"
                                                        className="ml-2 block text-sm text-gray-700"
                                                    >
                                                        Предупреждения
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        id="critical"
                                                        name="importance"
                                                        type="checkbox"
                                                        className="h-4 w-4 text-green-600 border-gray-300 rounded"
                                                        defaultChecked
                                                    />

                                                    <label
                                                        htmlFor="critical"
                                                        className="ml-2 block text-sm text-gray-700"
                                                    >
                                                        Критические ситуации
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700 mb-3">
                                        Контакты для оповещения
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <label
                                                htmlFor="email-contact"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email-contact"
                                                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder="example@university.edu"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="phone-contact"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Телефон
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone-contact"
                                                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder="+7 (XXX) XXX-XX-XX"
                                            />
                                        </div>
                                        <button className="mt-2 bg-green-600 text-white rounded-md text-sm px-4 py-2 hover:bg-green-700">
                                            Сохранить настройки
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-medium mb-4">Журнал оповещений</h3>
                            <div className="space-y-3">
                                {alerts.map((alert) => (
                                    <div
                                        key={alert.id}
                                        className={`p-4 rounded-lg flex items-start space-x-3 
                    ${alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}
                                    >
                                        <div
                                            className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center 
                      ${alert.type === 'warning' ? 'bg-yellow-100 text-yellow-500' : 'bg-red-100 text-red-500'}`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <h4
                                                    className={`font-medium ${alert.type === 'warning' ? 'text-yellow-800' : 'text-red-800'}`}
                                                >
                                                    {alert.type === 'warning'
                                                        ? 'Предупреждение'
                                                        : 'Критическая ситуация'}
                                                </h4>
                                                <span className="text-sm text-gray-500">
                                                    {alert.time}
                                                </span>
                                            </div>
                                            <p className="text-sm mt-1">{alert.message}</p>
                                            <div className="mt-2 flex space-x-2">
                                                <button className="text-xs text-gray-600 hover:text-gray-800">
                                                    Отметить как прочитанное
                                                </button>
                                                <button className="text-xs text-blue-600 hover:text-blue-800">
                                                    Подробнее
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-6">
                <div className="container mx-auto px-4 py-4">
                    <div className="text-center text-sm text-gray-500">
                        © 2025 ЭкоМониторинг корпуса №1 НИУ БелГУ. Все права защищены.
                    </div>
                </div>
            </footer>
        </div>
    );
}
