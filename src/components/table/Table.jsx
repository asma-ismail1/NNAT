import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from "react"
import num from 'service-names-port-numbers';




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

const List = (data) => {
  var rows= [{}];
  const [open, setOpen] = React.useState(false);
  const [modalText, setModalText] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ports=num()
  
  const findWhichArrayContainsValue=(val, proto) => {
    let selectedProduct;
    let a=proto=='6' ? proto='tcp' : proto=='17' ? proto='udp':proto ;
    console.log(selectedProduct=ports.find(port => port.PortNumber == val && port.TransportProtocol == proto))
    if( selectedProduct=ports.find(port => port.PortNumber == val && port.TransportProtocol == proto))
      return selectedProduct.ServiceName
    return val
  }
  console.log(findWhichArrayContainsValue(53,'udp'));
  
 
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

  return (
  <div>
   {
    //this table is ready to be a datagrid :)
   }
  <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">IP Version</TableCell>
            <TableCell className="tableCell">Source</TableCell>
            <TableCell className="tableCell">Destination</TableCell>
            <TableCell className="tableCell">Src Port</TableCell>
            <TableCell className="tableCell">Dst Port</TableCell>
            <TableCell className="tableCell">Timestamp</TableCell>
            <TableCell className="tableCell">Protocol</TableCell>
            <TableCell className="tableCell">Payload Length</TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
           
            <TableRow key={row.id} onClick={() => {setModalText(row.payload_hex);handleOpen() }} >
              
              <TableCell className="tableCell"> {row.version}</TableCell>
              <TableCell className="tableCell">{row.src}</TableCell>
              <TableCell className="tableCell">{row.dst}</TableCell>
              <TableCell className="tableCell">{findWhichArrayContainsValue(row.sport,row.proto)}</TableCell>
              <TableCell className="tableCell">{findWhichArrayContainsValue(row.dport,row.proto)}</TableCell>
              <TableCell className="tableCell">{row.time}</TableCell>
              <TableCell className="tableCell">{row.proto}</TableCell>
              <TableCell className="tableCell">{row.payload+'B'}</TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
      {            
      console.log('im here')
   
      }
      {   console.log(num()[4].ServiceName)}
    </TableContainer>
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

export default List;
