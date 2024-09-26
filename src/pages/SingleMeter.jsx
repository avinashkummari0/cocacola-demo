// src/pages/SingleMeter.js
import React, { useEffect, useState } from "react";
import CurrentTime from "../components/CurrentTime";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { dark, green_fusion, light, coca } from "../constants";
import { useTheme } from "../components/ThemeContext";
import { API_URL } from "../data/api";
import PrintView from "../components/PrintView"; // Import PrintView

const SingleMeter = () => {
  const [data, setData] = useState(null);
  const { theme, toggleTheme } = useTheme();
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}`);
        setData(response.data[0]);
        console.log(response.data[0]);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1500); // Fetch data every 1.5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const meters = [
    { id: 1, name: "VDC Block 2&3 Lighting" },
    { id: 2, name: "VDC Block 2&3 AC's" },
    // ... (other meters)
    { id: 25, name: "Medha Hostel" },
  ];

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');

    // Prepare the HTML content for printing
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('</head><body>');
    
    // Render the PrintView component as a string
    printWindow.document.write(`
      <div>
        <h1>Meter Report</h1>
        <h2>${meters.map((m) => (m.id == id ? m.name : "")).join("")}</h2>
        <h3>Voltage Details</h3>
        <p>Voltage R - Phase: ${data?.[`Voltage_V1N_meter_${id}`]} V</p>
        <p>Voltage Y - Phase: ${data?.[`Voltage_V2N_meter_${id}`]} V</p>
        <p>Voltage B - Phase: ${data?.[`Voltage_V3N_meter_${id}`]} V</p>
        <p>Line Voltage V<sub>RY</sub>: ${data?.[`Voltage_V12_meter_${id}`]} V</p>
        <p>Line Voltage V<sub>YB</sub>: ${data?.[`Voltage_V23_meter_${id}`]} V</p>
        <p>Line Voltage V<sub>BR</sub>: ${data?.[`Voltage_V31_meter_${id}`]} V</p>
        <p>No of Units Consumed: ${data?.[`TotalNet_KWH_meter_${id}`].toFixed(0)} kWh</p>
        <h3>Current Details</h3>
        <p>Current R - Phase: ${data?.[`Current_I1_meter_${id}`]} A</p>
        <p>Current Y - Phase: ${data?.[`Current_I2_meter_${id}`]} A</p>
        <p>Current B - Phase: ${data?.[`Current_I3_meter_${id}`]} A</p>
        <p>Neutral Current: ${data?.[`Neutral_Current_meter_${id}`]}</p>
        <h3>Power Details</h3>
        <p>Real Power, P: ${data?.[`Total_KW_meter_${id}`]} kW</p>
        <p>Apparent Power, S: ${data?.[`Total_KVA_meter_${id}`]} kVA</p>
        <p>Reactive Power, Q: ${data?.[`Total_KVAR_meter_${id}`]} kVAR</p>
        <p>Power Factor: ${data?.[`Avg_PF_meter_${id}`]}</p>
      </div>
    `);

    printWindow.document.write('</body></html>');
    printWindow.document.close(); // Close the document
    printWindow.print(); // Open the print dialog
  };

  return (
    <div className="flex md:flex-row flex-col">
      <Sidebar />
      <section className="bg-[#F1F4FC] dark:bg-[#1e1e1e] w-full text-[#1F2937] px-3 h-screen overflow-auto 2xl:px-5">
        <header className="justify-between flex items-center ml-16 ">
          <img src={coca} className="logo w-64 h-24 object-center my-4" alt="" /> 
          <span className="flex flex-row justify-center items-center">
            <img
              className="w-[30px] h-[30px] cursor-pointer 2xl:w-[42px] 2xl:h-[42px]"
              src={theme === "light" ? dark : light}
              alt="add"
              onClick={toggleTheme}
            />
            <p className="md:text-sm 2xl:text-2xl text-xs text-center px-4 text-gray-500 font-Audiowide font-medium dark:text-[#eae8e8]">
              <CurrentTime />
            </p>
          </span>
        </header>

        <div className="flex flex-col items-center my-10 ">
          <div className="gap-4 justify-center text-lg bg-gray-400 border rounded-xl shadow-md text-center max-[430px]:px-5 px-10 py-6">
            <h2 className="font-bold text-xl text-center font-Montserrat mb-7">
              {meters.map((m) => (m.id == id ? m.name : ""))}
            </h2>
            <div className="flex min-[1020px]:flex-row flex-col gap-5 w-full">
              <div className="flex flex-col gap-5">
                {/* Voltage and Consumption Details */}
                <div className="flex justify-between items-center gap-4 max-[380px]:gap-2">
                  <h2 className="parameter">Voltage R - Phase</h2>
                  <p className="param-value">{data?.[`Voltage_V1N_meter_${id}`]} V</p>
                </div>
                {/* Add other parameters as needed... */}
                <div className="flex justify-between items-center ">
                <h2 className="parameter">Voltage Y - Phase</h2>
                <p className="param-value">
                  {data?.[`Voltage_V2N_meter_${id}`]} V
                </p>
              </div>
              <div className="flex justify-between items-center ">
                <h2 className="parameter">Voltage B - Phase</h2>
                <p className="param-value">
                  {data?.[`Voltage_V3N_meter_${id}`]} V
                </p>
              </div>
              <div className="flex justify-between items-center ">
                <h2 className="parameter">Line Voltage V<sub>RY</sub></h2>
                <p className="param-value">
                  {data?.[`Voltage_V12_meter_${id}`]} V
                </p>
              </div>
              <div className="flex justify-between items-center ">
                <h2 className="parameter">Line Voltage V<sub>YB</sub></h2>
                <p className="param-value">
                  {data?.[`Voltage_V23_meter_${id}`]} V
                </p>
              </div>
              <div className="flex justify-between items-center ">
                <h2 className="parameter">Line Voltage V<sub>BR</sub></h2>
                <p className="param-value">
                  {data?.[`Voltage_V31_meter_${id}`]} V
                </p>
              </div>
              <div className="flex justify-between items-center gap-4 max-[380px]:gap-2">
                  <h2 className="parameter">No of Units Consumed</h2>
                  <p className="param-value">{data?.[`TotalNet_KWH_meter_${id}`].toFixed(0)} kWh</p>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                
                {/* Add other parameters as needed... */}
                <div className="flex justify-between items-center ">
                <h2 className="parameter">Current R - Phase</h2>
                <p className="param-value">
                  {data?.[`Current_I1_meter_${id}`]} A
                </p>
              </div>
              <div className="flex justify-between items-center ">
                <h2 className="parameter">Current Y - Phase</h2>
                <p className="param-value">
                  {data?.[`Current_I2_meter_${id}`]} A
                </p>
              </div>
              <div className="flex justify-between items-center ">
                <h2 className="parameter">Current B - Phase</h2>
                <p className="param-value">
                  {data?.[`Current_I3_meter_${id}`]} A
                </p>
              </div>
              <div className="flex justify-between items-center gap-4 max-[380px]:gap-2">
                <h2 className="parameter">Real Power, P </h2>
                <p className="param-value">
                  {data?.[`Total_KW_meter_${id}`]} kW
                </p>
              </div>
              <div className="flex justify-between items-center ">
                <h2 className="parameter">Apparent Power, S </h2>
                <p className="param-value">
                  {data?.[`Total_KVA_meter_${id}`]} kVA
                </p>
              </div>
              <div className="flex justify-between items-center ">
                <h2 className="parameter">Reactive Power, Q </h2>
                <p className="param-value">
                  {data?.[`Total_KVAR_meter_${id}`]} kVAR
                </p>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="parameter">Power Factor </h2>
                <p className="param-value">{data?.[`Avg_PF_meter_${id}`]} </p>
              </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-5 gap-4 max-[380px]:gap-2">
                <h2 className="parameter">Neutral Current </h2>
                <p className="param-value">
                  {data?.[`Neutral_Current_meter_${id}`]} 
                </p>
              </div>
          </div>
        </div>
        <div className="flex justify-center gap-10 my-8">
          <button 
            className="font-medium text-white bg-blue-600 rounded-lg w-16 h-9"
            onClick={handlePrint} // Add onClick handler
          >
            Print
          </button>
          <button className="font-medium text-white bg-blue-600 rounded-lg w-16 h-9">Save as</button>
        </div>
      </section>
    </div>
  );
};

export default SingleMeter;
