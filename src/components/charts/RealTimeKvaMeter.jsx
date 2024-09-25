import GaugeChart from "react-gauge-chart";
import { useTheme } from "../ThemeContext";
import { useState } from "react";

const RealTimeKvaMeter = ({ kva }) => {
  const { theme, toggleTheme } = useTheme();
  const [value, setValue] = useState(0);
  const minEnergy = 0;
  const maxEnergy = 1200;

  const normalizedPower = (kva - minEnergy) / (maxEnergy - minEnergy);
  const gaugeColors = ["#00ff00", "#ff0000"];

  const valueHandler = () => {
    if (kva > value) {
      setValue(kva);
    }
  };
  valueHandler();

  return (
    <div className="flex" >
      <div
        className={`bg-white py-1 dark:text-white h-full rounded-lg m-1 p-16 flex  items-center shadow font-OpenSans dark:bg-[#2c2c2c]`}
      >
        {" "}
        <div>
          <h2 className="font-bold text-xl font-Montserrat ml-20">Transformer1</h2>

          <h2 className="font-bold text-xl font-Montserrat ml-28 mb-5 ">CMD</h2>
           <GaugeChart
        id="gauge-chart"
        nrOfLevels={10}
        colors={gaugeColors}
        percent={normalizedPower}
        textColor={theme === 'light' ? "#000000" : "#ffffff"}
        formatTextValue={() => `${kva} kVA`}
        className="min-[2000px]:text-3xl xl:text-xl text-lg max-[500px]:text-base font-medium mb-5"
        needleColor={theme === 'light' ? '#000' : '#fff'}   
      /> 
          <h2 className="font-OpenSans text-sm font-medium flex flex-col mb-5">
            Today Highest Peak Value{" "}
            <span className="bg-red-300 font-semibold py-1 my-1 rounded-lg text-center">
              {value} kVA
            </span>
          </h2>
          <h2 className="font-OpenSans text-sm font-medium flex flex-col mb-5">
            Month Highest Peak Value{" "}
            <span className="bg-red-300 font-semibold py-1 my-1 rounded-lg text-center">
              929.71 kVA
            </span>
          </h2>
        </div>
      </div>
      {/* <div
        className={`bg-white py-1 dark:text-white h-full p-16 m-2 rounded-lg w-full flex flex-col items-center shadow font-OpenSans dark:bg-[#2c2c2c]`}
      >
        {" "}
        <div>
          <h2 className="font-bold text-xl font-Montserrat ">Transformer2</h2>

          <h2 className="font-bold text-xl font-Montserrat ml-8">CMD</h2>
          {/* <GaugeChart
        id="gauge-chart"
        nrOfLevels={10}
        colors={gaugeColors}
        percent={normalizedPower}
        textColor={theme === 'light' ? "#000000" : "#ffffff"}
        formatTextValue={() => `${kva} kVA`}
        className="min-[2000px]:text-3xl xl:text-xl text-lg max-[500px]:text-base font-medium "
        needleColor={theme === 'light' ? '#000' : '#fff'}   
      /> *
          <h2 className="font-OpenSans text-sm font-medium flex flex-col">
            Today Highest Peak Value{" "}
            <span className="bg-red-300 font-semibold py-1 my-1 rounded-lg text-center">
              {value} kVA
            </span>
          </h2>
          <h2 className="font-OpenSans text-sm font-medium flex flex-col">
            Month Highest Peak Value{" "}
            <span className="bg-red-300 font-semibold py-1 my-1 rounded-lg text-center">
              929.71 kVA
            </span>
          </h2>
        </div>
      </div>

      <div
        className={`bg-white py-1 dark:text-white h-full rounded-lg w-full p-16 m-2 flex flex-col items-center shadow font-OpenSans dark:bg-[#2c2c2c]`}
      >
        {" "}
        <div>
          <h2 className="font-bold text-xl font-Montserrat ">Transformer3</h2>

          <h2 className="font-bold text-xl font-Montserrat ml-8">CMD</h2>
          {/* <GaugeChart
        id="gauge-chart"
        nrOfLevels={10}
        colors={gaugeColors}
        percent={normalizedPower}
        textColor={theme === 'light' ? "#000000" : "#ffffff"}
        formatTextValue={() => `${kva} kVA`}
        className="min-[2000px]:text-3xl xl:text-xl text-lg max-[500px]:text-base font-medium "
        needleColor={theme === 'light' ? '#000' : '#fff'}   
      /> *
          <h2 className="font-OpenSans text-sm font-medium flex flex-col">
            Today Highest Peak Value{" "}
            <span className="bg-red-300 font-semibold py-1 my-1 rounded-lg text-center">
              {value} kVA
            </span>
          </h2>
          <h2 className="font-OpenSans text-sm font-medium flex flex-col">
            Month Highest Peak Value{" "}
            <span className="bg-red-300 font-semibold py-1 my-1 rounded-lg text-center">
              929.71 kVA
            </span>
          </h2>
        </div>
      </div>
      <div
        className={`bg-white py-1 dark:text-white h-full p-20 m-2 rounded-lg w-full flex flex-col items-center shadow font-OpenSans dark:bg-[#2c2c2c]`}
      >
        {" "}
        <div>
          <h2 className="font-bold text-xl font-Montserrat ">Transformer4</h2>

          <h2 className="font-bold text-xl font-Montserrat ml-8 ">CMD</h2>
          {/* <GaugeChart
        id="gauge-chart"
        nrOfLevels={10}
        colors={gaugeColors}
        percent={normalizedPower}
        textColor={theme === 'light' ? "#000000" : "#ffffff"}
        formatTextValue={() => `${kva} kVA`}
        className="min-[2000px]:text-3xl xl:text-xl text-lg max-[500px]:text-base font-medium "
        needleColor={theme === 'light' ? '#000' : '#fff'}   
      /> 
          <h2 className="font-OpenSans text-sm font-medium flex flex-col">
            Today Highest Peak Value{" "}
            <span className="bg-red-300 font-semibold py-1 my-1 rounded-lg text-center">
              {value} kVA
            </span>
          </h2>
          <h2 className="font-OpenSans text-sm font-medium flex flex-col">
            Month Highest Peak Value{" "}
            <span className="bg-red-300 font-semibold py-1 my-1 rounded-lg text-center">
              929.71 kVA
            </span>
          </h2>
        </div>
      </div>
      <div
        className={`bg-white py-1 dark:text-white h-full p-16 m-2 rounded-lg w-full flex flex-col items-center shadow font-OpenSans dark:bg-[#2c2c2c]`}
      >
        {" "}
        <div>
          <h2 className="font-bold text-xl font-Montserrat ">Transformer5</h2>

          <h2 className="font-bold text-xl font-Montserrat ml-8 ">CMD</h2>
          {/* <GaugeChart
        id="gauge-chart"
        nrOfLevels={10}
        colors={gaugeColors}
        percent={normalizedPower}
        textColor={theme === 'light' ? "#000000" : "#ffffff"}
        formatTextValue={() => `${kva} kVA`}
        className="min-[2000px]:text-3xl xl:text-xl text-lg max-[500px]:text-base font-medium "
        needleColor={theme === 'light' ? '#000' : '#fff'}   
      /> 
          <h2 className="font-OpenSans text-sm font-medium flex flex-col">
            Today Highest Peak Value{" "}
            <span className="bg-red-300 font-semibold py-1 my-1 rounded-lg text-center">
              {value} kVA
            </span>
          </h2>
          <h2 className="font-OpenSans text-sm font-medium flex flex-col">
            Month Highest Peak Value{" "}
            <span className="bg-red-300 font-semibold py-1 my-1 rounded-lg text-center">
              929.71 kVA
            </span>
          </h2>
        </div>
      </div> */}
    </div>
  );
};

export default RealTimeKvaMeter;
