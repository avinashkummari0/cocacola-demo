import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import moment from 'moment';
import { useTheme } from '../ThemeContext';
import { API_URL } from '../../data/api';

const PowerLineChart = () => {
  const [data, setData] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}`); // Adjust the endpoint as needed
        const currentTime = moment().format('HH:mm');

        // Calculate the sum of Total_KVA_meter_1 and Total_KVA_meter_15
        const sumKVA = parseFloat(response.data[0].Total_KVA_meter_70) + parseFloat(response.data[0].Total_KVA_meter_20 ) + parseFloat(response.data[0].Total_KVA_meter_69 );

        const newData = {
          timestamp: currentTime,
          sumKVA: sumKVA
        };

        setData(prevData => [...prevData, newData]);
      } catch (error) {
        console.error('Error fetching energy data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Fetch data every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='max-md:py-5 bg-white rounded-lg w-full sm:h-full h-56 p-0 md:p-1 xl:p-3 2xl:p-5 shadow font-OpenSans dark:bg-[#2c2c2c] min-[2200px]:text-2xl 2xl:text-xl text-sm max-[500px]:text-xs font-medium'>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" tick={{ fill: theme === 'light' ? '#000' : '#fff' }} />
          <YAxis tick={{ fill: theme === 'light' ? '#000' : '#fff' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sumKVA" stroke="#8884d8" name="kVA" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PowerLineChart;
