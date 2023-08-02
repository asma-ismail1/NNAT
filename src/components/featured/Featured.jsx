import "./featured.scss";
import { Link } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
      </div>
      <div className="bottom">
       {// <p className="title">Total sales made today</p>
}
        <p className="amount">Start Sniffing Now!</p>
        <p className="desc">
      
        <Link to="/sniffer" style={{ textDecoration: "none" }}> <button id="myButton">Start Sniffing</button></Link>
    
        </p>
        <div className="summary">
          <div className="item">
            
            
          </div>
          <div className="item">
            
          </div>
          <div className="item">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
