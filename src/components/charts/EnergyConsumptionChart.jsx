import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { useTheme } from '../ThemeContext';

const getFixedEnergyData = () => {
    return [
        {
            date: moment().subtract(4, 'days').format('YYYY-MM-DD'),
            energy: 10725
        },
        {
            date: moment().subtract(3, 'days').format('YYYY-MM-DD'),
            energy: 8520
        },
        {
            date: moment().subtract(2, 'days').format('YYYY-MM-DD'),
            energy: 7410
        },
        {
            date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
            energy: 10820
        },
        {
            date: moment().format('YYYY-MM-DD'),
            energy: 8849
        }
    ];
};

const EnergyConsumptionChart = () => {
    const { theme } = useTheme();

    // Use fixed energy data
    const energyData = getFixedEnergyData();

    return (
        <div className="bg-white max-md:py-5 p-0 md:p-1 xl:p-3 2xl:p-5 w-full h-full rounded-lg min-[2200px]:text-2xl 2xl:text-xl text-sm max-[500px]:text-xs max-sm:h-full font-medium shadow font-OpenSans dark:bg-[#2c2c2c]">
            <ResponsiveContainer width="100%">
                <BarChart data={energyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fill: theme === 'light' ? '#000' : '#fff' }} />
                    <YAxis tick={{ fill: theme === 'light' ? '#000' : '#fff' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="energy" fill="#8884d8" name="Energy" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EnergyConsumptionChart;
