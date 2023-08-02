import './Analyzer'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import FileUpload from '../../components/fileUpload/FileUpload';


const Login = () => {

  return (
    <div className="home">
      <Sidebar props={2} />
      <div className="homeContainer">
        <Navbar pagee="Net Analyzer>Analyzer" />
        
        <div className="charts"><FileUpload/>
        </div>
        
        </div>
      </div>
  )
}

export default Login