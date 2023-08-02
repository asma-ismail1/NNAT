import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import  LineCharttt  from "./LineChartt.js";

Chart.register(CategoryScale);

const LineChartGraph = ({ datum,datum2,datum3,datum4, txt}) => {


  console.log(typeof datum,datum2)
  console.log(datum)

  const [chartData, setChartData] = useState({
    labels:datum2, 
    datasets: [
      {
        label: txt,
        data: datum,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "blue",
        borderWidth: 1
      },
      {
        label: txt,
        data: datum3,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "red",
        borderWidth: 1
      }
    ]
  });
 
  return (
    
    <div className="chart">
      <div className="title">{txt}</div>
 

      <LineCharttt chartData={chartData} />

   </div>
  );
};

export default LineChartGraph;
