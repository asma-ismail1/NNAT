import "./info.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Info = (srcAddr) => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Top Source Address:</h1>
        <p>{srcAddr.srcAddr.src
        }
        </p>
        
        <h1 className="title">Top Destination Address:</h1>
        <p>{srcAddr.srcAddr.dst
        }
        </p>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
      <div className="featuredChart">
        
      <form action="/action_page.php">
  <label for="ip">Show info for:</label>
  <select name="ip" id="ip">
  {srcAddr.srcAddr.allSrc.map((s) =><option value={s}>{s}</option>  )}
</select>
  <br/><br/>
  <input type="submit" value="Submit"/>
</form>
      
        </div>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Top Address Speakers</div>
            <div className="itemResult negative">
            <div id="box">
            {srcAddr.srcAddr.srcSpeakers.map((s) =><p><a href={"https://whatismyipaddress.com/ip/"+s} target="_blank">{s}</a></p>  )}

</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Top Address source ports</div>
            <div className="itemResult positive">
            <div id="box">
            {srcAddr.srcAddr.srcPort.map((s) =><p>{s}</p>  )}

</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Top Address destination ports</div>
            <div className="itemResult positive">
            <div id="box">
{srcAddr.srcAddr.dstPort.map((s) =><p>{s}</p>  )}

</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
