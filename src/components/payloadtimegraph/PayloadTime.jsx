import "./payloadtime.scss";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';




const PayloadTime = ({ datum,datum2,datum3}) => {

  const mapArrays = (options, values,values2) => {
    const res = [];
    for(let i = 0; i < options.length; i++){
       res.push({
          time: options[i],
          Payload: values[i],
          Payload2: values2[i],
       });
    };
    return res;
 };
  const dat_arr=mapArrays(datum3,datum,datum2)
  return (
    
    <div className="chart">
      {console.log(datum3)}
      <div className="title">payload sent by each address </div>
      <BarChart
          width={1000}
          height={300}
          data={dat_arr}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Payload" stackId="a" fill="#8884d8" />
          <Bar dataKey="Payload2" stackId="a" fill="#82ca9d" />
        </BarChart>
   </div>
  );
};

export default PayloadTime;
