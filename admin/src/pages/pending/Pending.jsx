import List1 from "../../components/list1/List1";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./pending.scss";

const Pending = ({columns}) => {
  return (
    <div className="pending">
        <Sidebar />
        <div className="pending-container">
           <Navbar />
           <List1 columns={columns}/>
        </div>
    </div>
  )
}

export default Pending;