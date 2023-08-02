import "./payload.scss";
import {
  
  Legend,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  Line,


} from "recharts";



const Payload = ({ datum}) => {
  const mapArrays = (options, values,values2) => {
    const res = [];
    for(let i = 0; i < options.length; i++){
       res.push({
          IP: options[i],
          Payload: values[i],
          Payload_Dst: values2[i]
       });
    };
    return res;
 };
  console.log(mapArrays(datum.payloadSrcKeys,datum.payloadSrcValues,datum.payloadDstValues))
  const dat_arr=mapArrays(datum.payloadSrcKeys,datum.payloadSrcValues,datum.payloadDstValues)
  return (
    
    <div className="chart">
      {console.log(datum)}
      <div className="title">payload sent by source and destination address </div>
      <LineChart width={1000} height={200} data={dat_arr}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="IP" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Payload" stroke="#0b8400" />
        <Line type="monotone" dataKey="Payload_Dst" stroke="#ff6645" />

      </LineChart>

   </div>
  );
};

export default Payload;
