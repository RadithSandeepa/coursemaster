import { Link, useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import useFetch from "../../../hooks/useFetch";
import "./singleuser.scss";
import { UilPen } from '@iconscout/react-unicons';
import  { Toaster, toast } from "react-hot-toast";


const SingleUser = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/users/${id}`);

  if (loading) {
    return (
      <div className="singleuser">
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

    
  return (
    <div className="singlecourse">
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
                <div className="btns">
                    <div className="btnContainer"><tooltip title="Edit"><Link to={`/users/${id}/edit`}><UilPen className="edit"/></Link></tooltip></div>
                </div>
               <h1>{data.email}({data.Id})</h1>
               <div className="content">
                    <h3>Role: {data.role}</h3>
               </div>
            </div>
        </div>
    </div>
  )
}

export default SingleUser;
