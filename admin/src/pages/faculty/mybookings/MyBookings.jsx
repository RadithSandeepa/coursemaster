import FacultyTable from "../../../components/facultytable/FacultyTable";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./mybooking.scss";

const MyBookings = ({columns}) => {
  return (
    <div className='mybooking'>
       <Sidebar />
        <div className="right">
           <Navbar />
           <FacultyTable columns={columns}/>
        </div>
    </div>
  )
}

export default MyBookings