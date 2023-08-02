import "./chart.scss";
import { PieChart, Pie, Legend, Tooltip,Cell } from 'recharts';




const Chart = ({ aspect, title ,datum}) => {
  const COLORS = ["#0088FE", "#00C49F"];

  const mapArrays = (options, values) => {
    const res = [];
    for(let i = 0; i < options.length; i++){
       res.push({
          name: options[i],
          packets: values[i]
       });
    };
    return res;
 };
  const dat_arr=mapArrays(datum.keys,datum.values)
  return (
    <div className="featured">

    <div className="chart">
      {console.log(datum)}
      <div className="title">{title}</div>
      <PieChart width={400} height={400}>
          <Pie
            dataKey="packets"
            isAnimationActive={true}
            data={dat_arr}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
          {dat_arr.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}</Pie>
                    <Legend />

          <Tooltip />
        </PieChart>
   </div>
   </div>
  );
};

export default Chart;
