import { useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import useFetch from "../../../hooks/useFetch";
import "./singlebooking.scss";
import  { Toaster, toast } from "react-hot-toast";

const SingleBooking = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/bookings/${id}`);
  
  if (loading) {
    return (
      <div className="singlebooking">
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

  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust the format as needed
  };

  const getType = (type) => {
    switch (type) {
      case 'L':
        return 'Lecture';
      case 'E':
        return 'Event';
      default:
        return '';
    }
  };

  const getStatus = (status) => {
    switch (status) {
      case 'A':
        return 'Accepted';
      case 'P':
        return 'Pending';
      case 'R':
        return 'Rejected';
      default:
        return '';
    }
  };

  return (
    <div className="singlebooking">
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
               <h1>Booking for {data.type && getType(data.type)}({data.status && getStatus(data.status)})</h1>
               <div className="content">
               <h3>Date: {formatDate(data.date)}</h3>
               <h3>Start Time: {data.startTime}</h3>
               <h3>End Time: {data.endTime}</h3>
               <h3>User ID: {data.userId}</h3>
               <h3>Room ID: {data.roomId}</h3>
               <h3> Resource IDs: {data.resourceIds && data.resourceIds.length > 0 ? data.resourceIds.join(", ") : "None"}</h3>
               </div>
            </div>
        </div>
    </div>
  )
}

export default SingleBooking;
