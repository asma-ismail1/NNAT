import React, {Component} from "react"
import axios from 'axios'


class toggleSniffing extends Component{

    constructor(props){
        super(props)
        this.state={
            start_sniff:true

        }
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
    submitHandler=e=>{
        e.preventDefault()
            axios.post('http://127.0.0.1:5000/sniff',this.state).then(
            
            response=>{
                console.log(JSON.parse(JSON.stringify(response)))
                this.setState({start_sniff:false});
                
            }
        ).catch(
            error=>{
                console.log(error)
            })
console.log(this.props)
    }
    render(){
        const {start_sniff}=this.state
        return(
        <div><form   role="form" onSubmit={this.submitHandler}>



    
              
        <button type="submit">Start</button>
       
        </form> 
       { //<div className="result">
       // <Result res={this.state.ready=='yes' ? 'Result:\n'+ this.state.result: this.state.ready=='loading...' ? this.state.ready : ''}/> </div>
    }</div>
      
        )
        
    }
}

  
export default toggleSniffing;

