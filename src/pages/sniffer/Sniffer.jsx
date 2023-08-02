import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Sniffing from "./toggleSniffing";
const Sniffer = () => {
  
  return (
    <div className="home">
      <Sidebar props={1}/>
     

      <div className="homeContainer">
        <Navbar pagee="Net Analyzer>Live Sniffing"/>
        <Sniffing />
       
        </div>
      </div>
  )
}

export default Sniffer