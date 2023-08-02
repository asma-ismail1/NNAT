import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Form from './Form'
import { Link } from "react-router-dom";


const New = ({ inputs, title ,path }) => {

  return (
    <div className="new">
      <Sidebar props={3}/>
      <div className="newContainer">
        <Navbar  pagee={"Net Analyzer>Live Scanner>"+title}/>
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left"><ul>
          <li> <Link to="/scan" className="link">
         <button>Back</button>
        </Link></li>
            <li> <Link to="/scan/arp" className="link">
         <button>ARP</button>
        </Link></li>
        <li><Link to="/scan/icmp" className="link">
        <button>ICMP</button>
        </Link></li>
        <li>
          <Link to="/scan/tcp" className="link">
          <button>TCP Port Scan</button>
        </Link></li>

        <li><Link to="/scan/udp" className="link">
        <button>UDP Port Scan</button>
        </Link></li></ul></div>
          <div className="right">
          <Form inputs={inputs} path={path}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
