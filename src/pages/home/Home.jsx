import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";

const Home = () => {
  return (
    <div className="home">
      <Sidebar props={0}/>
      <div className="homeContainer">
        <Navbar pagee="Net Analyzer>Dashboard" />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          
        </div>
        <div className="charts">
          <Featured />
          
        </div>
      </div>
    </div>
  );
};

export default Home;
