import React, {Component} from "react"
import axios from 'axios'
import "./new.scss";
import Datatable from "../../components/datatableres/DatatableScanRes";


class PostForm extends Component{

    constructor(props){
        super(props)
        this.state={
            ip:'',
            srange:'',
            erange:'',
            timeout:'',
            save:false,
            result:'',
            ready:'no',

        }
    }
    
    changeHandler=e=>{
        this.setState({[e.target.name]:e.target.value})
        
    }
    countScan = () => {
        localStorage.setItem('scancount',((+localStorage.getItem('scancount'))+1))
    }
    saveScan=()=>{
        const cb = document.getElementById('cb');
        console.log(cb.checked)

        this.setState({save:cb.checked})
        
    }
    submitHandler=e=>{
        e.preventDefault()
        this.setState({ready:'loading...'})
        
        var a=this.state
        axios.post('http://127.0.0.1:5000'+this.props.path,a).then(
            
            response=>{
                console.log(JSON.parse(JSON.stringify(response)).data.arp_scan_content)
                this.state.ready=true;
                this.setState({result : JSON.parse(JSON.stringify(response)).data.arp_scan_content})
                this.setState({ready:'yes'});
                
            }
        ).catch(
            error=>{
                console.log(error)
            })
console.log(this.props)
    }
    render(){
        const {ip,srange,erange,timeout,result}=this.state
        return(
        <div><form   role="form" onSubmit={this.submitHandler}>



    {this.props.inputs.map((input) => (
                <div className="formInput" key={input.id}  >
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} id={input.name} name={input.name} required onChange={this.changeHandler} />
                  
                </div>
                
              ))}
              
        <button type="submit" onClick={this.countScan}>Start</button>
        <div className="cb">
                <p>Save Scan</p>
            <label className="switch">
  <input type="checkbox" onClick={this.saveScan} id='cb'></input>
  <span className="slider round"></span>
</label></div>
        </form> 
        <div className="result">
            {this.state.ready=='yes' ? <Datatable dat={this.state.result} type={this.props.path}/>: this.state.ready=='loading...' ? this.state.ready : ''}
            
            {
                
        //<Result res={this.state.ready=='yes' ? 'Result:\n'+ this.state.result: this.state.ready=='loading...' ? this.state.ready : ''}/> 
        
            }
            </div>
        </div>
      
        )
        
    }
}

  
export default PostForm;

