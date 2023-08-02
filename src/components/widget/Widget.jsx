import "./widget.scss";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  let data;
  let showdata;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      showdata=localStorage.getItem('scancount')
      data = {
        title: "SCANS",
        isMoney: false,
        link: "See all Scans",
        
      };
      break;
    case "order":
      showdata=localStorage.getItem('capcount')
      data = {
        title: "PCAPs created",
        isMoney: false,
        
        
      };
      break;
    case "earning":
      showdata=localStorage.getItem('analycount')
      data = {
        title: "PCAP Files Analyzed",
        isMoney: false,
        
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {showdata}
        </span>
        <span className="link"><Link to="/scan" style={{ textDecoration: "none" }}>{data.link}</Link></span>
      </div>
      <div className="right">
        
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
