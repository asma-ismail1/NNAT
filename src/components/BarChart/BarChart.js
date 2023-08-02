// components/BarChart.js
import 'chartjs-plugin-zoom';
import { Bar } from "react-chartjs-2";
import Hammer from "hammerjs";
export const BarChart = ({ chartData,txt }) => {
  console.log("prints")
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>{txt}</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            zoom: {
              pan:{
                enabled:true,
                mode:'xy',
                threshold: 10,
              },
              zoom: {
                wheel: {
                  enabled: true,
                }
            ,  
            },
           },
            title: {
              display: true,
              
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};