import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"

const List = () => {
  return (
    <div className="list">
      <Sidebar props={3}/>
      <div className="listContainer">
        <Navbar pagee="Net Analyzer>Scanner"/>
        <div className="scantable">
        <Datatable/>
        </div>
      </div>
    </div>
  )
}

export default List