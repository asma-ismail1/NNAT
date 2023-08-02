import React, { useState } from "react";
import "./sidebar.css";
import Logo from "./imgs/logo.png";
import { SidebarData } from "./Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const Sidebar = (props) => {
  const [selected, setSelected] = useState(props.props);
  const [expanded, setExpaned] = useState(0)
console.log(props)
  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <img src={Logo} alt="logo" />
        
        <Link to="/" style={{ textDecoration: "none" }}>
        <span> Network Analyzer
        </span>
        </Link>
       
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
              

              
              <Link to={item.route} style={{ textDecoration: "none" }}>
              <span>{item.heading}</span>
              </Link>
              </div>
            

          );
        })}
        {/* signoutIcon */}
        <div className="menuItem">
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
