import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Label, Legend } from 'recharts';
import { API_URL } from '../../data/api';

const RealTimeEnergyMeter = () => {
  const [energyMeter, setEnergyMeter] = useState(0);
  const maxEnergy = 250000; // Define the maximum energy value for the meter

  const fetchCurrentEnergy = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      setEnergyMeter(response.data[0].TotalNet_KWH_meter_1);
    } catch (error) {
      console.error('Error fetching current energy:', error);
    }
  };

  useEffect(() => {
    fetchCurrentEnergy(); // Initial fetch
    const intervalId = setInterval(fetchCurrentEnergy, 10000); // Fetch every 60 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const data = [
    { name: 'Energy', value: energyMeter },
    { name: 'Remaining', value: maxEnergy - energyMeter }
  ];

  const COLORS = ['#8884d8', '#000000'];

  return (
    <div className='bg-white flex px-4 justify-center items-center rounded-lg text-lg shadow font-OpenSans dark:bg-[#2c2c2c] dark:text-[#ffffff]'>
      <ResponsiveContainer height={300} width={300}> 
        <PieChart>
          <Pie
            data={data}
            startAngle={360}
            endAngle={0}
            innerRadius={90}
            outerRadius={130}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            <Label value={`Energy-${energyMeter.toFixed(2)}`} position="center" className='text-wrap' />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RealTimeEnergyMeter;