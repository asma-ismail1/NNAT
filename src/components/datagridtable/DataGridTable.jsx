import { DataGrid, GridEventListener, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from "react"
import num from 'service-names-port-numbers';
import protos from 'protocol-numbers'
var protocols = require('protocol-numbers')


function ChildModal(props) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height:400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const hex2a = (hexx) => {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
    }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button onClick={handleOpen}>Show Payload in ASCII</button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{...style}} className="modalContainer">
          <h2 id="child-modal-title">ASCII Payload</h2>
          <p id="child-modal-description" className="modalText">
            {hex2a(props.text)
            }
          </p>
          <button onClick={handleClose}>Show Payload in Hexadecimal</button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const DataGridTable = (data) => {
  var rows= [{}];
  
  const [open, setOpen] = React.useState(false);
  const [modalText, setModalText] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ports=num()
  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    handleOpen();
    setModalText(params.row.payload_hex);
    
  };
  const findWhichArrayContainsValue=(val, proto) => {
    let selectedProduct;
    let a=proto=='6' ? proto='tcp' : proto=='17' ? proto='udp':proto ;
    if( selectedProduct=ports.find(port => port.PortNumber == val && port.TransportProtocol == proto))
      return selectedProduct.ServiceName
    return val
  }
//const protos=proto()
  const findWhichArrayContainsValueProto=(proto) => {
    try{
    for (var i=0; i<Object.keys(protocols).length;i++){
    if( protocols[i].value == proto )
      return protocols[i].name
    }
    
}
catch{}
return proto
  }
  
  
 
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height:400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
  try{
      rows=data.data
      console.log(rows)
    
  }
  catch{
console.log("error in table")
  }
  function getBytePrefix(params: GridValueGetterParams) {
    return `${params.row.payload } ${'B'}`;
  }
  function getServiceSource(params: GridValueGetterParams) {
    return `${findWhichArrayContainsValue(params.row.sport,params.row.proto) }`;
  }
  function getServiceDest(params: GridValueGetterParams) {
    return `${findWhichArrayContainsValue(params.row.dport,params.row.proto) }`;
  }
  function getProtoName(params: GridValueGetterParams) {
    return `${findWhichArrayContainsValueProto(params.row.proto) }`;
  }
  const userColumns : GridColDef[]  = [
    { field: "src", headerName: "Source", width: 135, },
    {
      field: "dst",
      headerName: "Destination",
      width: 135,
    },
    ,
    { field: "sport", headerName: "Src Port", width: 90, valueGetter: getServiceSource},
    { field: "dport", headerName: "Dst Port", width: 90, valueGetter: getServiceDest},
    { field: "time", headerName: "Timestamp", width: 165 },
    { field: "proto", headerName: "Protocol", width: 70, valueGetter: getProtoName },
    { field: "payload", headerName: "Payload Length", width: 115, valueGetter: getBytePrefix, }

  ];
  return (
  <div>
   {
    //this table is ready to be a datagrid :)
   }
  
    <div className="datatable">
      
      <div style={{height: '96%'}}>
      <DataGrid
      onRowClick={handleRowClick}{...rows}
      getRowId={() => Math.floor(Math.random() * 100000000)} 
        className="datagrid"
        rows={rows}
        columns={userColumns}
        pageSize={50}
        rowsPerPageOptions={[50]}
        
      />
      </div>
    </div>
  


    <div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="modalContainer">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Payload:
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <p className="modalText">{modalText}</p>
          
        </Typography>
        
<ChildModal text={modalText} />
      </Box>
    </Modal>
  </div>
    </div>
  );
};

export default DataGridTable;
