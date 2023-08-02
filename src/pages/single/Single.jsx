import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import Datatabler from "../../components/datatableres/DatatableScanRes";
import Result from "../result/Result";
import { useLocation } from 'react-router-dom';
const Single = (props) => {
  const location = useLocation()
  console.log(location.state)
  return (
    <div className="single">
      <Sidebar props={3} />
      <div className="singleContainer">
        <Navbar pagee="Net Analyzer>Live Scanner>Scanner Results"/>
        <div className="top">
          <div className="left">
            <h1 className="title">{location.state.ip}</h1>
            <div className="item">
              <div className="details">
              <div className="detailItem">
                  <span className="itemKey">Protocol:</span>
                  <span className="itemValue">{location.state.protocol}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Start Range:</span>
                  <span className="itemValue">{location.state.srange}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">End Range:</span>
                  <span className="itemValue">{location.state.erange}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Timeout:</span>
                  <span className="itemValue">
                  {location.state.timeout}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Date:</span>
                  <span className="itemValue">{location.state.date}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
          <Datatabler dat={location.state.response} type={location.state.protocol}/>

          
          
            {
              console.log(location.state.response)
//<Result res={location.state.response}/>
              
            }
            </div>
        </div>
       
        <div className="bottom">
          <Datatable filter={location.state.network}/>
          
          
        </div>
      </div>
    </div>
  );
};

export default Single;
