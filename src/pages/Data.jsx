import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Import useNavigate and useLocation for navigation
import Sidebar from "../components/Sidebar";
import axios from "axios";
import Loading from "../components/Loading";
import { useTheme } from "../components/ThemeContext";
import { API_URL, API_URL2 } from "../data/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CurrentTime from "../components/CurrentTime"

const Data = () => {
  // Get current URL and query parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  // Get the date from the query parameter or use today's date as the default
  const defaultDate = searchParams.get('date') || new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(defaultDate);
  
  const [data, setData] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const [currentEnergy, setCurrentEnergy] = useState({
    meter_70: null,
    meter_40: null,
    meter_69: null,
    meter_41: null,
  });
  const [initialEnergyValues, setInitialEnergyValues] = useState({
    meter_70: null,
    meter_40: null,
    meter_69: null,
    meter_41: null,
  });
  const [todayConsumption, setTodayConsumption] = useState({
    meter_70: null,
    meter_40: null,
    meter_69: null,
    meter_41: null,
  });

  const notify = () => toast.error("Energy limit exceeded!");

  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    // Fetch previous day's energy (initial energy)
    const fetchPreviousDayEnergy = async () => {
      try {
        const response = await axios.get(`${API_URL2}/api/previousDayEnergy`);
        setInitialEnergyValues(
          response.data.initialEnergyValues || {
            meter_70: null,
            meter_40: null,
            meter_69: null,
            meter_41: null,
          }
        );
      } catch (error) {
        console.error("Error fetching previous day energy:", error);
      }
    };

    fetchPreviousDayEnergy();
  }, []);

  useEffect(() => {
    // Fetch current energy values every minute
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}?date=${date}`);
        const newData = response.data[0];
        setData(newData);
        setCurrentEnergy({
          meter_70: newData.TotalNet_KWH_meter_70,
          meter_40: newData.TotalNet_KWH_meter_40,
          meter_69: newData.TotalNet_KWH_meter_69,
          meter_41: newData.TotalNet_KWH_meter_41,
        });
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Fetch data every 1 minute

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [date]);

  useEffect(() => {
    // Calculate consumption based on initial energy and current energy
    if (initialEnergyValues && currentEnergy) {
      setTodayConsumption({
        meter_70:
          initialEnergyValues.meter_70 && currentEnergy.meter_70
            ? (currentEnergy.meter_70 - initialEnergyValues.meter_70).toFixed(3)
            : 0,
        meter_40:
          initialEnergyValues.meter_40 && currentEnergy.meter_40
            ? (currentEnergy.meter_40 - initialEnergyValues.meter_40).toFixed(3)
            : 0,
        meter_69:
          initialEnergyValues.meter_69 && currentEnergy.meter_69
            ? (currentEnergy.meter_69 - initialEnergyValues.meter_69).toFixed(3)
            : 0,
        meter_41:
          initialEnergyValues.meter_41 && currentEnergy.meter_41
            ? (currentEnergy.meter_41 - initialEnergyValues.meter_41).toFixed(3)
            : 0,
      });
    }
  }, [initialEnergyValues, currentEnergy]);

  // Handle redirection to the same page with the selected date
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);

    // Redirect to the same page with the selected date as a query param
    navigate(`?date=${selectedDate}`);
  };

  const handlePrint = () => {
    window.print(); // Opens print dialog
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center w-full">
        <Loading />
      </div>
    );
  }

  return (
    <section className="w-full h-fit flex md:flex-row flex-col">
      <Sidebar />
      
      <div className="p-6 bg-gray-100 min-h-screen w-full">
        <div className="flex justify-between mb-4">
          {/* <h1 className="text-2xl font-bold mb-4">Sensor Data Dashboard</h1> */}
          <img src="https://1000logos.net/wp-content/uploads/2021/05/Coca-Cola-logo.png" className=" logo w-40 h-full object-center ml-16 " alt="" />
          {/* Date Selector */}
          <div className="flex gap-4 justify-center items-center">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="date"
            >
              Select Date:
            </label>
            <input
              type="date"
              id="date"
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={date}
              onChange={handleDateChange} // Update state and redirect when a date is selected
            />
          </div>
        </div>

        {/* Display the selected date */}
        <div className="mb-6 text-lg font-semibold text-blue-700">
          Selected Date: {new Date(date).toDateString()}
        </div>

        {/* Data for Transformers */}
        <div className="w-full flex flex-col justify-around bg-[#a4a4e3] rounded-lg py-4 px-3 mt-16">
          <div className="param-div font-bold text-lg">
            <h2>Transformers</h2>
            <p>Power (kW)</p>
            <p>Energy (kWh)</p>
            <p>kVA</p>
            <p>Power Factor</p>
            <p>kVAh</p>
          </div>

          {/* Transformer 1 */}
          <div className="param-div">
            <Link to={`/pcc1?date=${date}`}>
              <h2 className="pccs">Transformer1</h2>
            </Link>
            <p className="value">{data?.Total_KW_meter_70.toFixed(2)}</p>
            <p className="value">{data?.TotalNet_KWH_meter_70.toFixed(1)}</p>
            <p className="value">{data?.Total_KVA_meter_70.toFixed(2)}</p>
            <p className="value">{data?.Avg_PF_meter_70.toFixed(2)}</p>
            <p className="value">{data?.TotalNet_KVAH_meter_70.toFixed(1)}</p>
          </div>

          {/* Transformer 2 */}
          <div className="param-div">
            <Link to={`/pcc2?date=${date}`}>
              <h2 className="pccs">Transformer2</h2>
            </Link>
            <p className="value">{data?.Total_KW_meter_20.toFixed(2)}</p>
            <p className="value">{data?.TotalNet_KWH_meter_20.toFixed(1)}</p>
            <p className="value">{data?.Total_KVA_meter_20.toFixed(2)}</p>
            <p className="value">{data?.Avg_PF_meter_20.toFixed(3)}</p>
            <p className="value">{data?.TotalNet_KVAH_meter_20.toFixed(1)}</p>
          </div>

          {/* Transformer 3 */}
          <div className="param-div">
            <Link to='/pcc3'><h2 className="pccs">
              Transformer3
            </h2></Link>
            <p className="value">
            {data?.Total_KW_meter_69.toFixed(2)}
            </p>
            <p className="value">
            {data?.TotalNet_KWH_meter_69.toFixed(1)} {/* {todayConsumption.meter_69} */}
            </p>
            <p className="value">
            {data?.Total_KVA_meter_69.toFixed(2)}
            </p>
            <p className="value">
            {data?.Avg_PF_meter_69.toFixed(3)}
            </p>
            <p className="value">
            {data?.TotalNet_KVAH_meter_69.toFixed(1)}
            </p>
          </div>

          {/* Transformer 4 */}
          <div className="param-div">
            <Link to='/pcc3'><h2 className="pccs">
              Transformer4
            </h2></Link>
            <p className="value">
            {data?.Total_KW_meter_69.toFixed(2)}
            </p>
            <p className="value">
            {data?.TotalNet_KWH_meter_69.toFixed(1)} {/* {todayConsumption.meter_69} */}
            </p>
            <p className="value">
            {data?.Total_KVA_meter_69.toFixed(2)}
            </p>
            <p className="value">
            {data?.Avg_PF_meter_69.toFixed(3)}
            </p>
            <p className="value">
            {data?.TotalNet_KVAH_meter_69.toFixed(1)}
            </p>
          </div>

          {/* Transformer 5 */}
          <div className="param-div">
            <Link to='/pcc3'><h2 className="pccs">
              Transformer5
            </h2></Link>
            <p className="value">
            {data?.Total_KW_meter_69.toFixed(2)}
            </p>
            <p className="value">
            {data?.TotalNet_KWH_meter_69.toFixed(1)} {/* {todayConsumption.meter_69} */}
            </p>
            <p className="value">
            {data?.Total_KVA_meter_69.toFixed(2)}
            </p>
            <p className="value">
            {data?.Avg_PF_meter_69.toFixed(3)}
            </p>
            <p className="value">
            {data?.TotalNet_KVAH_meter_69.toFixed(1)}
            </p>
          </div>
        </div>

        <div className="flex gap-5 justify-center mt-10">
          <button 
            className="bg-blue-600 px-6 py-1 rounded-md font-medium text-white"
            onClick={handlePrint} // Call handlePrint function on click
          >
            Print
          </button>
          <button className="bg-blue-600 px-6 py-1 rounded-md font-medium text-white">Save as</button>
        </div>
      </div>
    </section>
  );
};

export default Data;
