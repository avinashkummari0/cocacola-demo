import React, { useEffect, useState } from "react";
import CurrentTime from "../components/CurrentTime";
import Sidebar from "../components/Sidebar";
import { dark } from "../constants";
import Panels from "../components/Panels";
import RealTimePowerMeter from "../components/charts/RealTimePowerMeter";
import axios from "axios";
import RealTimeEnergyMeter from "../components/charts/RealTimeEnergyMeter";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [totalEnergy,setTotalEnergy] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vems-api.onrender.com/api/sensordata"
        );
        setData(response.data[0]);
        console.log(response.data[0]);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex md:flex-row flex-col w-full">
      <Sidebar />
      <section className="bg-[#F1F4FC] dark:bg-[#1e1e1e] py-2 w-full h-screen overflow-auto">
        <div className="mx-2 my-2">
          <div className="flex justify-between mx-10 font-Audiowide dark:text-[#e4e2e2]">
            <h2 className="font-bold text-2xl ">Energy Monitoring System</h2>
            <div className="flex flex-row justify-center text-sm items-center font-semibold gap-2">
              <img
                className="w-[30px] h-[30px] cursor-pointer 2xl:w-[42px] 2xl:h-[42px]"
                src={dark}
                alt="add"
              />
              <CurrentTime />
            </div>
          </div>
        </div>
        <div className="flex mx-3 gap-3 my-6 w-full">
            <Panels/>
            <div className="flex gap-3">
            <RealTimeEnergyMeter totalEnergy={data?.TotalNet_KWH_meter_1.toFixed(2)}/>
            <RealTimePowerMeter kva={data?.Total_KVA_meter_1.toFixed(2)}/>
            </div>
        </div>
        <div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

//Panels

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "./data/api";

const Panels = () => {
    const [data, setData] = useState(null);

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

    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between text-lg px-4 py-5 rounded-xl bg-[#bdbdbd] font-OpenSans">
        <div className="font-medium gap-8 flex flex-col">
          <p className="font-bold font-Montserrat px-6 py-1 rounded-full cursor-pointer" >PCC</p>
          <Link to="/Pcc2">
            <p className="bg-[#6eabbf] px-6 py-1 rounded-full cursor-pointer">
              PCC2
            </p>
          </Link>
          <Link to="/Pcc3">
            <p className="bg-[#6eabbf] px-6 py-1 rounded-full cursor-pointer">
              PCC3
            </p>
          </Link>
          <Link to="/Pcc4">
            <p className="bg-[#6eabbf] px-6 py-1 rounded-full cursor-pointer">
              PCC4
            </p>
          </Link>
          <Link to="/Pcc5">
            <p className="bg-[#6eabbf] px-6 py-1 rounded-full cursor-pointer">
              PCC5
            </p>
          </Link>
        </div>
        <div className="gap-8 flex flex-col text-center">
          <p className="font-bold font-Montserrat">Power<span className="text-sm">(Kw)</span></p>
          <p className="dash-param">0</p>
          <p className="dash-param">0</p>
          <p className="dash-param">{data?.Total_KW_meter_1.toFixed(2)}</p>
          <p className="dash-param">0</p>
        </div>
        <div className="gap-8 flex flex-col text-center">
          <p className="font-bold font-Montserrat">Energy<span className="text-sm">(Kwh)</span></p>
          <p className="dash-param">0</p>
          <p className="dash-param">0</p>
          <p className="dash-param">{data?.TotalNet_KWH_meter_1.toFixed(1)}</p>
          <p className="dash-param">0</p>
        </div>
        <div className="gap-8 flex flex-col text-center">
          <p className="font-bold font-Montserrat">Power Factor</p>
          <p className="dash-param">0</p>
          <p className="dash-param">0</p>
          <p className="dash-param">{data?.Avg_PF_meter_1.toFixed(3)}</p>
          <p className="dash-param">0</p>
        </div>
        <div className="gap-8 flex flex-col text-center">
          <p className="font-bold font-Montserrat">KVA</p>
          <p className="dash-param">0</p>
          <p className="dash-param">0</p>
          <p className="dash-param">{data?.Total_KVA_meter_1.toFixed(2)}</p>
          <p className="dash-param">0</p>
        </div>
      </div>
    </div>
  );
};

export default Panels;

//css 
@layer components {
  .dash-param {
      @apply bg-[#efefef] w-28 py-1 rounded-full
  }
  .param-div {
      @apply flex md:gap-10 gap-8 max-[620px]:gap-6 rounded-md p-2 text-center justify-between items-center max-[360px]:gap-1
  }
  .value {
      @apply bg-white w-28 py-1 font-OpenSans font-medium border rounded-full;
  }
  .parameter {
      @apply bg-[#A8E6CF] border md:w-64 font-Montserrat w-56 font-semibold py-2 rounded-full 2xl:py-4 cursor-pointer;
  }
  .parameter1 {
      @apply bg-[#FF8B94] border md:w-64 font-Montserrat w-56 font-semibold py-2 rounded-full 2xl:py-4 cursor-pointer;
  }
}