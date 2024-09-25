import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GaugeChart from 'react-gauge-chart';
import { useTheme } from '../ThemeContext';

const PowerFactorCharts = ({powerFactor}) => {
  const { theme, toggleTheme } = useTheme();
  const minEnergy = -5;
  const maxEnergy = 5;

  const normalizedPower = (powerFactor - minEnergy) / (maxEnergy - minEnergy);

  const gaugeColors = theme === 'light' ? ['#f0ff00' , '#0000ff'] : ['#00ff00', '#ff0000'];

  return (
    <div className='bg-white py-1 rounded-lg h-full flex items-center min-[2000px]:text-2xl 2xl:text-xl text-lg max-[500px]:text-base font-medium justify-center shadow font-OpenSans dark:bg-[#2c2c2c] dark:text-[#ffffff]'>
      <GaugeChart 
        id="gauge-chart"
        nrOfLevels={3}
        percent={normalizedPower}
        colors={gaugeColors}
        textColor={theme === 'light' ? "#000000" : "#ffffff"}
        className=''
        /* needleColor={theme === 'light' ? '#000' : '#fff'} */
      />
    </div>
  );
};

export default PowerFactorCharts;