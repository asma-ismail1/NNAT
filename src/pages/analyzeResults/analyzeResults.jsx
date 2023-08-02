import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React from 'react';
import Chart from '../../components/chart/Chart';
import Table from '../../components/table/Table';
import Payload from '../../components/payload/Payload';
import { useLocation } from 'react-router-dom';
import {App} from '../../components/chartJSBarTest/bar';
//import LineChart from '../../components/LineChart/LineChart.js';

import './analyzeResults'


import PortGraph from '../../components/portgraph/PortGraph';


const AnalyzeRes = () => {
    const location = useLocation()
    console.log(location.state)

  return (
    <div className="home">
      <Sidebar props={4} />
      <div className="homeContainer">
        <Navbar pagee="Net Analyzer>Analyzer>Results"/>
        <div className='left'><div><Chart datum={location.state.data}/> <Payload datum={location.state.data}/><PortGraph datum={location.state.data.payloadSrcPortKey} datum2={location.state.data.payloadSrcPortValue}/><PortGraph datum={location.state.data.payloadDstPortKey} datum2={location.state.data.payloadDstPortValue}/><PortGraph datum={location.state.data.payload_by_timepdst} datum2={location.state.data.payload_by_timep}/><PortGraph datum={location.state.data.payload_by_timevdst} datum2={location.state.data.payload_by_timev}/><Table data={location.state.data.pcaps}/></div> 

</div>

        </div>
      </div>
  )
}

export default AnalyzeRes