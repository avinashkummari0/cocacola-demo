// src/components/PrintView.js
import React from 'react';

const PrintView = ({ data, meters }) => {
  return (
    <div>
      <h1>Meter Report</h1>
      <h2>{meters.map((m) => (m.id == data.id ? m.name : ""))}</h2>
      <h3>Voltage Details</h3>
      <p>Voltage R - Phase: {data[`Voltage_V1N_meter_${data.id}`]} V</p>
      <p>Voltage Y - Phase: {data[`Voltage_V2N_meter_${data.id}`]} V</p>
      <p>Voltage B - Phase: {data[`Voltage_V3N_meter_${data.id}`]} V</p>
      <p>Line Voltage V<sub>RY</sub>: {data[`Voltage_V12_meter_${data.id}`]} V</p>
      <p>Line Voltage V<sub>YB</sub>: {data[`Voltage_V23_meter_${data.id}`]} V</p>
      <p>Line Voltage V<sub>BR</sub>: {data[`Voltage_V31_meter_${data.id}`]} V</p>
      <p>No of Units Consumed: {data[`TotalNet_KWH_meter_${data.id}`].toFixed(0)} kWh</p>
      <h3>Current Details</h3>
      <p>Current R - Phase: {data[`Current_I1_meter_${data.id}`]} A</p>
      <p>Current Y - Phase: {data[`Current_I2_meter_${data.id}`]} A</p>
      <p>Current B - Phase: {data[`Current_I3_meter_${data.id}`]} A</p>
      <p>Neutral Current: {data[`Neutral_Current_meter_${data.id}`]}</p>
      <h3>Power Details</h3>
      <p>Real Power, P: {data[`Total_KW_meter_${data.id}`]} kW</p>
      <p>Apparent Power, S: {data[`Total_KVA_meter_${data.id}`]} kVA</p>
      <p>Reactive Power, Q: {data[`Total_KVAR_meter_${data.id}`]} kVAR</p>
      <p>Power Factor: {data[`Avg_PF_meter_${data.id}`]}</p>
    </div>
  );
};

export default PrintView;
