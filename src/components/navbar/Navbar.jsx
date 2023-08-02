import "./navbar.scss";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Navbar = (pagee) => {
  const { dispatch } = useContext(DarkModeContext);
const page=pagee.pagee
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
         <p>{page}</p>
        </div>
        <div className="items">
          
          
          
           
      
        </div>
      </div>
    </div>
  );
};

export default Navbar;
