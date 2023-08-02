import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

const Datatable = (dat) => {
  var userColumns;
  if(dat.type=='/arpScan' || dat.type=='ARP'){
     userColumns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "mac", headerName: "Mac Address", width: 200 },
        {
          field: "ip",
          headerName: "IP",
          width: 200,
        },
       
      ];
    }
    else if( dat.type=='/icmpScan' || dat.type=='ICMP'){
      userColumns = [
        { field: "id", headerName: "ID", width: 70 },
        {
          field: "ip",
          headerName: "IP",
          width: 200,
        },
       
      ];
    }
    else{
       userColumns = [
        { field: "id", headerName: "ID", width: 70 },
        
        {
          field: "port",
          headerName: "Status",
          width: 200,
        },
        { field: "num", headerName: "Port", width: 200 },
       
      ];
    }
      console.log(dat.dat)
  const [data, setData] = useState(dat.dat);
  return (
    <div className="datatable">
      
      <div style={{height: '96%'}}>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns}
        pageSize={7}
        rowsPerPageOptions={[7]}
        
      />
      </div>
    </div>
  );
};

export default Datatable;
