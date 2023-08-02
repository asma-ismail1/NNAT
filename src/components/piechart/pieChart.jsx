import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import PieChartt from "./piechartt.js";

Chart.register(CategoryScale);
 
const PieChart=(datum1)=> {
  const [step, setStep] = useState(datum1.step)
  console.log(step)
  const [datumOne, setDatum1] = useState(datum1.datum1)
  const [datumTwo, setDatum2] = useState(datum1.datum2)
  console.log(datum1.datum1)
  console.log(datum1.datum2)

    console.log(datum1.step)
    
  var [chartData, setChartData] = useState({
    labels: datum1.datum1, 
    datasets: [
      {
        label: "Users Gained ",
        data: datum1.datum2,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 1
      }
    ]
  });

  return (
    <div>
    <div className="title"></div>


  <PieChartt chartData={{
    labels: datum1.datum1, 
    datasets: [
      {
        label: "Users Gained ",
        data: datum1.datum2,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 1
      }
    ]
  }} />

    </div>
      
  );
}
export default PieChart;