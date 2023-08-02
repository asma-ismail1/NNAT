import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'


const Datatable = (filter) => {
  
  
    const [data, setData] = useState({});
    const fetchJSON=()=>{
      fetch('scan.json')
      .then((response) => response.json())
      .then((json) => setData(json));
    }
fetchJSON()
  const createCSV = () => {
    axios.get('http://127.0.0.1:5000/save_scan').then(
            
      response=>{
        
          fetch('CSV/data.csv').then(response => {
              response.blob().then(blob => {
                  const fileURL = window.URL.createObjectURL(blob);
                  let alink = document.createElement('a');
                  alink.href = fileURL;
                  alink.download = 'tableOutput.csv';
                  alink.click();
              })
          })
      

          
      }
  ).catch(
      error=>{
          console.log(error)
      })
  };
  const handleDelete = (id) => {
    var index = data.findIndex(x => x.id ===id);
    axios.post('http://127.0.0.1:5000/delete',{id:index}).then(
            
      response=>{
             setData(data.filter((item) => item.id !== id));

          
      }
  ).catch(
      error=>{
          console.log(error)
      })

  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={'/scan/'+params.row.id} state={{protocol:params.row.Protocol,network:params.row.network,ip:params.row.IP,srange:params.row.srange,erange:params.row.erange,timeout:params.row.timeout,date:params.row.date,response:params.row.response}} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Scan History
        <div
              className="link"
              onClick={() => createCSV()}
            >Export to CSV</div>
       
     
        <Link to="/scan/arp" className="link">
          New Scan
        </Link>
        </div>
      <div style={filter.filter!=null ? {height: '96%'}:{height: '96%'} }>
      <DataGrid
        className="datagrid"
        rows={data }
        columns={userColumns.concat(actionColumn)}
        filterModel={{
          items: [{ columnField: 'network', value: filter.filter  }],
        }}
        pageSize={7}
        rowsPerPageOptions={[7]}
        
      />
      </div>
    </div>
  );
};

export default Datatable;
