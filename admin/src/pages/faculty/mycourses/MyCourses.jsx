import FacultyTable from "../../../components/facultytable/FacultyTable";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./mycourses.scss";

const MyCourses = ({columns}) => {
  return (
    <div className='mycourses'>
        <Sidebar />
        <div className="right">
           <Navbar />
           <FacultyTable columns={columns}/>
        </div>
    </div>
  )
}

export default MyCourses;