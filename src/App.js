import Home from "./pages/home/Home";
import Analyzer from "./pages/analyzer/Analyzer";
import AnalyzeResult from "./pages/analyzeResults/analyzeResults";
import Sniffer from "./pages/sniffer/Sniffer";

import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";

import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, ARPInputs,UDPInputs,TCPInputs,ICMPInputs } from "./pages/sources/formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import MalwareRes from "./pages/malwareResults/malwareResults";
import MalwareScan from "./pages/malwareScan/malwareScan";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "App"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<div className="AppGlass"><Home /></div>} />
            <Route path="sniffer" element={<div className="AppGlass"><Sniffer /></div>} />
            <Route path="analyzer">
            <Route index element={<div className="AppGlass"><Analyzer /></div>} />
            <Route
                path="result"
                element={<div className="AppGlass"><AnalyzeResult/></div>}
              />
           </Route>
            <Route path="scan">
              <Route index element={<div className="AppGlass"><List /></div>} />
              <Route path=":scanId" element={<div className="AppGlass"><Single /></div>} />

              
              
              <Route
                path="arp"
                element={<div className="AppGlass"><New inputs={ARPInputs} title="ARP Scan" path='/arpScan'/></div>}
              />
           
            <Route
                path="icmp"
                element={<div className="AppGlass"><New inputs={ICMPInputs} title="ICMP Scan" path='/icmpScan'/></div>}
              />
              <Route
                path="tcp"
                element={<div className="AppGlass"><New inputs={TCPInputs} title="TCP Scan" path='/tcpScan'/></div>}
              />
              <Route
                path="udp"
                element={<div className="AppGlass"><New inputs={UDPInputs} title="UDP Scan" path='/udpScan' /></div>}
              />
          
           </Route>
           <Route path="malware_analysis">
            <Route index element={<div className="AppGlass"><MalwareScan/></div>} />

            <Route
                path="malware_result"
                element={<div className="AppGlass"><MalwareRes/></div>}
              />
           </Route>
            <Route path="products">
              <Route index element={<div className="AppGlass"><List /></div>} />
              <Route path=":productId" element={<div className="AppGlass"><Single /></div>} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
