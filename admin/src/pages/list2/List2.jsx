import Datatable from "../../components/datatable/Datatable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./list2.scss";

const List2 = ({columns}) => {
  return (
    <div className="list2">
        <Sidebar />
        <div className="list2-container">
           <Navbar />
           <Datatable columns={columns}/>
        </div>
    </div>
  )
}

export default List2;