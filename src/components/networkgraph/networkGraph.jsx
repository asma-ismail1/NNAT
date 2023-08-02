import React from "react";
import Graph from "react-vis-network-graph";
import axios from "axios";

import Info from "../info/Info";
import { useState } from "react";

// import "./styles.css";
// need to import the vis network css in order to show tooltip
// import "./network.css";

const NetworkGraph =(src) =>{
    console.log(typeof src.src)
    console.log(src.srcSpeakers)
    console.log(src)
    const makeNetworkData = (topAddr, speakers) =>{
      var funs=[];
      funs.push({ id: 1, label: topAddr})
      for (var i=0; i<speakers.length; i++)
      {
        console.log(speakers[i])
        funs.push({id:i+2, label: speakers[i]})
        console.log("i'm here")
      }
      return funs
    }
    
      var funs=makeNetworkData(src.src,src.srcSpeakers);
      console.log(funs)
      //var connections=makeConnectionData(src.srcSpeakers)
      // fix the edge nodes so that each connection maps to the top speaker
      var connections=[];
      for (var i=0; i<src.srcSpeakers.length; i++)
      {
        connections.push({from:i+2, to: 1})
      }
      const [networkData, setNetworkData] = useState(funs);
      const [connectionData, setConnectionData] = useState(connections);
      const [params, setParams] = useState();
      const [file, setFile] = useState(src.file);

      const changeHandler=e=>{
        console.log(e.target.value)
        setParams(e.target.value)
        //console.log(params)
        console.log('not here')

    }

  const submitHandler=(ev)=>{


    ev.preventDefault();
    
    const data = new FormData();
    data.append('file', src.file);
    data.append('params', params);

    fetch('http://localhost:5000/getConnections', {
      method: 'POST',
      body: data,
    } 
    ).then((response) => {
      response.json().then((body) => {
        setNetworkData(makeNetworkData(params,body.this))
        //setConnectionData(body)
        console.log(networkData)
        console.log(body)   
      }  );
    });



  }
  const graph = {
    nodes: networkData,
    edges: connectionData
  };

  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: "red",
      arrows: ""
    },
    height: "300px",
    width: "450px"
  };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
      console.log(edges);
      console.log(nodes);
    }
  };
  const connectionList= src.dat.map((s) =><option value={s}>{s}</option>  )

  return (
    
    <div className="chart">
            <h2 style={{ textAlign: "center", margin: '10px' , marginBottom:'61px'}}>Connections</h2>

      <form action="http://localhost:5000/getConnection" onSubmit={submitHandler}>
  <label for="ip">Show Connections for:   </label>
  <select name="ip" id="ip" onChange={changeHandler}>
  {connectionList
  }
</select>
  <br/><br/>
  <button type="submit" value="Submit">Submit</button>
  <hr/>
</form>
    <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={(network) => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      }}
    />
    </div>
  );
}
export default NetworkGraph
