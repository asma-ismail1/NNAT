import React from "react";
import { Line } from "react-chartjs-2";


const LineCharttt = ({ chartData })=> {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Payload Sent/Received by each Address</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
              text: "Payload Sent/Received by each Address"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
  }
export default LineCharttt;