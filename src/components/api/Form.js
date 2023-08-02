import React, {Component} from "react"

import axios from 'axios'
class PostForm extends Component{

    constructor(props){
        super(props)
        this.state={
            ip:'',
            srange:'',
            erange:'',
            timeout:'',

        }
    }
    changeHandler=e=>{
        this.setState({[e.target.name]:e.target.value})

    }
    submitHandler=e=>{
        e.preventDefault()
        
        var a=this.state
        axios.post('http://127.0.0.1:5000/arpScan',a).then(
            response=>{
                console.log(JSON.parse(JSON.stringify(response)).data.arp_scan_content)
            }
        ).catch(
            error=>{
                console.log(error)
            })

    }
    render(){
        const {ip,srange,erange,timeout}=this.state
        return(
        <div><form   role="form" onSubmit={this.submitHandler}>

      
        <input type="text" id="ip" name="ip" placeholder="IP" required autofocus value={ip} onChange={this.changeHandler}/>
        <input type="text" id="erange" name="erange"  placeholder="End Range" required value={erange} onChange={this.changeHandler}/>       
        <input type="text" id="srange" name="srange"  placeholder="Start Range" required autofocus value={srange} onChange={this.changeHandler}/>
        <input type="text" id="timeout" name="timeout" placeholder="Timeout" required value={timeout} onChange={this.changeHandler}/>       

        <button type="submit">Start</button>
        </form>   </div>
        )
    }
}

  
export default PostForm;

