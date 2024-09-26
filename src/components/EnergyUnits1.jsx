import React from "react";

const EnergyUnits1 = ({energy}) => {
  return (
      <div className="bg-white rounded-lg shadow  text-lg font-OpenSans dark:bg-[#2c2c2c] dark:text-white text-center p-5 w-full h-full">
        <h2 className="font-bold text-xl text-center py-2 font-Montserrat">
          kwh Consumtion
        </h2>
        <p className="font-medium mt-6">Units Consumed Today</p>
        <p className="bg-[#a4a4e3] mx-4 p-2 my-3 rounded-lg font-semibold">8849.00 Units</p>
        <p className="font-medium mt-6" >Units Consumed This Month</p>
        <p className="bg-[#a4a4e3] mx-4 my-3 p-2 rounded-lg font-semibold">134596.24 Units</p>
      </div>
  );
};

export default EnergyUnits1;
