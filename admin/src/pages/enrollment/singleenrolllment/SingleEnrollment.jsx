import { useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import useFetch from "../../../hooks/useFetch";
import "./singleenrollment.scss";
import  { Toaster, toast } from "react-hot-toast";


const SingleEnrollment = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/enrollments/${id}`);
  
  if (loading) {
    return (
      <div className="singleenrollment">
        <Sidebar />
        <div className="right">
            <Navbar />
            <div className="container">
                <h1>Loading...</h1>
            </div>
        </div>
      </div>
    );
  }

  if (error) {
    toast.error("Unknown error occurred!");
  }

  const getStatusText = (status) => {
    if (status === "P") {
      return "Pending";
    } else if (status === "A") {
      return "Accepted";
    } else {
      return "Unknown";
    }
  };

  return (
    <div className="singleenrollment">
         <Toaster
          position="bottom-right" 
          toastOptions={{ 
            style: { 
              minWidth: '400px',
              padding: '25px', // Adjust padding as needed
              background: '#fcf5f3'
            } 
          }} 
        />
        <Sidebar />
        <div className="right">
            <Navbar />
            <div className="container">
               <h1>Status - {getStatusText(data.status)}</h1>
               <div className="content">
                    <h3>Student ID: {data.student}</h3>
                    <h3>Course ID: {data.course}</h3>
               </div>
            </div>
        </div>
    </div>
  )
}

export default SingleEnrollment;
