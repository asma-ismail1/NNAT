// src/components/PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import ProgressSteps from "../progressbar/progressBar";

const PieChartt=({ chartData }) =>{
  return (
    <div className="chart-container">
  
      
      {
        console.log(chartData)
        //<ProgressSteps/>
      }
      
      <hr/>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
              text: "Users Gained between 2016-2020"
            }
          }
        }}
      />
    </div>
  );
}
export default PieChartt;