import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../data/api";

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
          <p className="font-bold font-Montserrat">Energy <span className="text-sm">(Kwh)</span></p>
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
