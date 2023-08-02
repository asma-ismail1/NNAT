import React from 'react';
import PortGraph from '../portgraph/PortGraph';
import "./FileUpload.scss";
import LineChart from '../../components/LineChart/LineChart.jsx';
//import PieChart from '../../components/piechart/pieChart.jsx';
import ProgressSteps from '../progressbar/progressBar';
import NetworkGraph from '../networkgraph/networkGraph';
import DataGridTable from '../datagridtable/DataGridTable';





class FileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      loading: false
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }
  countAnalyze = () => {
    localStorage.setItem('analycount',((+localStorage.getItem('analycount'))+1))
}
  handleUploadImage(ev) {
    ev.preventDefault();
    this.setState({loading: true},() => {
    })  
    
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    console.log(this.uploadInput.files[0])

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: data,
    } 
    ).then((response) => {
      console.log(response.body)
      response.json().then((body) => {
        this.setState({data: body})  
        this.setState({loading: false},() => {
        })       
      }  );
    });
  }

  render() {
    return (
      <div>
      <div className='upload'>   
         <form onSubmit={this.handleUploadImage}>
        <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
        </div>
        <div>
        </div>
        <br />
        <div>

          <button id='upload' onClick={this.countAnalyze}>Upload</button>
        </div>
        
      </form>
      </div>
      {this.state.loading==true ? <div> 
      <span className="loader"/><span>Loading...</span>
    </div>: ''}
      {this.state.data!=''? <div><div className='rowC'>{console.log(this.state.data.payloadDstValues,this.state.data.payloadSrcKeys)}
      <ProgressSteps datum1={this.state.data.keys} datum2={this.state.data.values}/>     
<NetworkGraph src={this.state.data.src} srcSpeakers={this.state.data.srcSpeakers} dat={this.state.data.allSrc} file={this.uploadInput.files[0]}/></div><LineChart datum={this.state.data.payloadDstValues} datum2={this.state.data.payloadSrcKeys} datum3={this.state.data.payloadSrcValues} datum4={this.state.data.payloadDstKeys} /><div className='rowC'><PortGraph datum={this.state.data.payloadSrcPortKey} datum2={this.state.data.payloadSrcPortValue} txt={"Payload sent by each port"}/><PortGraph datum={this.state.data.payloadDstPortKey} datum2={this.state.data.payloadDstPortValue} txt={"Payload received by each port"}/></div><div className='rowC'><PortGraph datum={this.state.data.payload_by_timev} datum2={this.state.data.payload_by_timep} txt={"Payload sent over time"}/><PortGraph datum={this.state.data.payload_by_timevdst} datum2={this.state.data.payload_by_timepdst} txt={"Payload received over time"}/></div><DataGridTable data={this.state.data.pcaps}/>
      
      {console.log(this.state.data.srcSpeakers)}
      </div> :''}

      </div>
    );
  }
}

export default FileUpload;