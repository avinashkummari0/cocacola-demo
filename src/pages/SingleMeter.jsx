import React, { useEffect, useState } from "react";
import CurrentTime from "../components/CurrentTime";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { dark, green_fusion, light } from "../constants";
import { useTheme } from "../components/ThemeContext";
import { API_URL } from "../data/api";

const SingleMeter = () => {
  const [data, setData] = useState(null);
  const { theme, toggleTheme } = useTheme();
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}`
        );
        setData(response.data[0]);
        console.log(response.data[0]);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1500); // Fetch data every 60 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const meters = [
    { id: 1, name: "VDC Block 2&3 Lighting" },
    { id: 2, name: "VDC Block 2&3 AC's" },
    { id: 3, name: "Mini Auditorium AC's" },
    { id: 4, name: "Sumedha Hostel AC's" },
    { id: 5, name: "Sita Auditorium AC's" },
    { id: 6, name: "VDC Girls Hostels" },
    { id: 7, name: "VDC Block-1 AC's" },
    { id: 8, name: "VDC Library AC's" },
    { id: 9, name: "SVECW Library AC's" },
    { id: 10, name: "CSSD Building" },
    { id: 11, name: "Medha Hostel Lighting" },
    { id: 12, name: "Geysers" },
    { id: 13, name: "Medha Hostel Geysers" },
    { id: 14, name: "Hostel Geysers VDC" },
    { id: 15, name: "VIT Block-2 Lighting" },
    { id: 16, name: "VIT Block-1 Lighting" },
    { id: 17, name: "VIT Block-2 A/C's" },
    { id: 18, name: "VIT Block-3 Lighting" },
    { id: 19, name: "Vit Block-4 A/C's" },
    { id: 20, name: "4th Phase Main Panel Supply Boy's Hostel" },
    { id: 21, name: "VIT Block-1 AC's" },
    { id: 22, name: "Seetha Canteen Lighting" },
    { id: 23, name: "53 rooms lighting supply" },
    { id: 24, name: "3 Hostels (RPSP & GVVS)" },
    { id: 26, name: "VDC Block-1A" },
    { id: 25, name: "Medha Hostel" },
  ];

  return (
    <div className="flex md:flex-row flex-col">
      <Sidebar />
      <section className="bg-[#F1F4FC] dark:bg-[#1e1e1e] w-full text-[#1F2937] px-3 h-screen overflow-auto 2xl:px-5">
       {/*  <header className="justify-between flex items-center py-2">
        <h1 className="md:text-2xl 2xl:text-5xl text-xl p-4 flex md:gap-3 font-Audiowide font-bold dark:text-[#e4e2e2]">
        Green Fusion IoT Solutions<img src={green_fusion} className="w-20" alt="" /> 
        </h1>
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
        </header> */}
        <header className="justify-between flex items-center ml-16 ">
        {/* <h1 className="md:text-2xl 2xl:text-5xl text-xl p-4 flex md:gap-3 font-Audiowide font-bold dark:text-[#000000]"> */}
        <img src="https://1000logos.net/wp-content/uploads/2021/05/Coca-Cola-logo.png" className=" logo w-40 h-full object-center " alt="" /> 
        {/* </h1> */}
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
            {meters.map((m) => (
              <div>{m.id == id ? m.name : ""}</div>
            ))}
          </h2>
            <div className="flex min-[1020px]:flex-row flex-col gap-5 w-full">
              <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center gap-4 max-[380px]:gap-2">
                <h2 className="parameter">Voltage R - Phase</h2>
                <p className="param-value">
                  {data?.[`Voltage_V1N_meter_${id}`]} V
                </p>
              </div>
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
              <div className="flex justify-between items-center">
                <h2 className="parameter">No of Units Consumed </h2>
                <p className="param-value">
                  {data?.[`TotalNet_KWH_meter_${id}`].toFixed(0)} kWh
                </p>
              </div>
              </div>
              <div className="flex flex-col gap-5">
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
      </section>
    </div>
  );
};

export default SingleMeter;
