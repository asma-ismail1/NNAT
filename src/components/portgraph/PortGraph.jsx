import "./portgraph.scss";
import { BarChart } from "../BarChart/BarChart.js";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";

Chart.register(CategoryScale);

const PortGraph = ({ datum,datum2,txt}) => {

  const mapArrays = (options, values) => {
    const res = [];
    for(let i = 0; i < options.length; i++){
       res.push({
          port: options[i],
          Payload: values[i],
       });
    };
    return res;
 };
  const dat_arr=mapArrays(datum,datum2)
  console.log(typeof datum)
  const [chartData, setChartData] = useState({
    labels:datum, 
    datasets: [
      {
        label: txt,
        data: datum2,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "blue",
        borderWidth: 0
      }
    ]
  });
 
  return (
    
    <div className="chart">
 

       <BarChart chartData={chartData}  txt={txt} />

   </div>
  );
};

export default PortGraph;
