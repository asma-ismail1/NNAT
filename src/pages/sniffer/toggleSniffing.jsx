import React, {Component} from "react"
import axios from 'axios'
import TagsInput from '../../components/inputTag/inputTag';
import Table from '../../components/table/Table';
import "./sniffer.scss"
import DataGridTable from "../../components/datagridtable/DataGridTable";



//IMPORTANT TO DO:MAKE THE START_SNIFF A GLOBAL VARIABLE 
//SO THE STATE WOULD BE SAVED EVERYWHERE
                //localStorage.setItem('start_sniff',+localStorage.getItem('capcount')+1)

var isdisabled=true
var showpayload='none'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
class toggleSniffing extends Component{

    constructor(props){
        super(props)
        this.state={
            start_sniff:true,
            data: '',
            proto:'',
            srcport:'',
            dstport:'',
            srcaddr:'',
            dstaddr:'',
            bpf:'',
        }
    }
  
     onButtonClick = () => {
        fetch('pcaps/temp.pcap').then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                const abc = new File([blob], "asma");
                console.log(abc)
                console.log(fileURL)
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'output.pcap';
                alink.click();
                localStorage.setItem('capcount',+localStorage.getItem('capcount')+1)
            })
        })
    }
    changeHandler=e=>{
        this.setState({[e.target.name]:e.target.value})
        
    }

    
    toggleSniff=()=>{
        if(this.state.start_sniff){
          this.setState({start_sniff:false})
        }
        else{
          this.setState({start_sniff:true})
        }

        
        
    } 
    bpfToggle=()=>{

        const el = document.getElementsByClassName('toggledisable')
        const bpf = document.getElementById('bpf')

        for(var i = 0; i < el.length; i++) {
            el[i].disabled=! el[i].disabled;
        }
        bpf.disabled=!bpf.disabled

}
    showPayload = () => 
    {
        
            document.getElementById("payload").style.display = "block";
            console.log(this.state.data[0].payload_hex)
       
    }


     selectedTags = tags => {
		console.log(tags);
	};


    submitHandler=e=>{
        //e.preventDefault()
            axios.post('http://127.0.0.1:5000/sniff',this.state).then(
            response=>{
                this.setState({data:JSON.parse(JSON.stringify(response.data.pcaps))})
                this.setState({start_sniff:!this.state.start_sniff});
                console.log(response);
                

                
                
            }
        ).catch(
            error=>{
                console.log(error)
                this.setState({start_sniff:!this.state.start_sniff});

            })
            
//console.log(this.props)

//const data = new FormData();
    //data.append('file', this.uploadInput.files[0]);
    
    const data = new FormData();
/*
    //data.append('data', this.state.data);
    data.append('start_sniff', this.state.start_sniff);
    data.append('proto', this.state.proto);
    data.append('srcport', this.state.srcport);
    data.append('dstport', this.state.dstport);
    data.append('dstaddr', this.state.dstaddr);
    data.append('srcaddr', this.state.srcaddr);
    data.append('bpf', this.state.bpf);


    console.log(data)

    fetch('http://localhost:5000/sniff', {
      method: 'POST',
      body: data,
    } 
    ).then((response) => {
      console.log(response.body)
      response.json().then((body) => {
        console.log(body)
        this.toggleSniff()
        this.setState({resp: body})
        console.log(this.state.resp)
        
      
      }  );
    });
    */
    }
    
    render(){
        const {start_sniff}=this.state
        const protos=['','arp','ether','fddi','icmp','ip','ip6','link','ppp','radio','rarp','slip','tcp','tr','udp','wlan']
        const listItems = protos.map((prot) =>
        <option value={prot} name="proto">{prot}</option>
  );
        return(
        
        <div className="filters"><form   role="form" onSubmit={this.submitHandler}>


            
    
              
        <button type="button" onClick={this.submitHandler}>{start_sniff? 'Start': 'Stop'}</button>
        <br/>
        <hr/>
        <label for="proto">Filter Protocol: </label>
        <br/>
        <select name="proto" id="proto" onChange={this.changeHandler}>
            {listItems}
        </select>
        <br/>
        <div className="forms">
        <div className="srcport">
        <label  disabled={isdisabled} >Source Port: </label><input type="text" name="srcport" class="toggledisable"   onChange={this.changeHandler}/>
        </div>
        <div className="dstport">
        <label  disabled={isdisabled}>Destination Port: </label><input type="text" name="dstport" class="toggledisable" onChange={this.changeHandler}/>
        <br/>
        </div>
        <label  disabled={isdisabled}>Source Address: </label><input type="text" class="toggledisable" name="srcaddr" onChange={this.changeHandler}/>
        <label  disabled={isdisabled}>Destination Address: </label><input type="text" class="toggledisable" name="dstaddr" onChange={this.changeHandler}/>
        
        </div>
        <br/>
        <label  >BPF Filtering: </label>
        <div class="container">
  <label class="switch" for="checkbox">
    <input type="checkbox" id="checkbox" onClick={this.bpfToggle}  />
    <div class="slider round"></div>
  </label>
</div>
        
        <div className="forms">
        <input type="text" name='bpf' id="bpf" disabled='bpf' onChange={this.changeHandler}/>
        </div>
        <hr/>
        </form> 
        {
        this.state.data!=''? <div><button className="link" onClick={this.onButtonClick}>Save PCAP</button><DataGridTable data={this.state.data}/><div id="payload" style={{display: showpayload}}>{this.state.data[0].payload_hex}</div>
       </div> :''
    }

       </div>
      
        )
        
    }
}

  
export default toggleSniffing;

