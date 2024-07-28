import { Link, useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import useFetch from "../../../hooks/useFetch";
import "./singleresource.scss";
import  { Toaster, toast } from "react-hot-toast";
import { UilPen } from '@iconscout/react-unicons';

const SingleResource = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/resources/${id}`);
  
  if (loading) {
    return (
      <div className="singleresource">
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
    <div className="singleresource">
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
               <div className="btnContainer"><tooltip title="Edit"><Link to={`/resources/${id}/edit`}><UilPen className="edit"/></Link></tooltip></div>
               </div>
               <h1>{data.type}({data.code})</h1>
               <div className="content">

               </div>
            </div>
        </div>
    </div>
  )
}

export default SingleResource;
