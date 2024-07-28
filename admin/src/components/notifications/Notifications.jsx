import axios from "axios";
import "./notifications.scss";
import { UilTrashAlt, UilPen} from '@iconscout/react-unicons';
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const handleDelete = async (id, notifications, setNotifications) => {
  try{
    await axios.delete(`/notifications/${id}`)
    toast.success('Notification has been deleted');
    const updatedNotifications = notifications.filter(notification => notification._id !== id);
    setNotifications(updatedNotifications);
  }catch(err){
    console.log(err);
    toast.error('Oops! Something went wrong.');
  }
  
};

function Notifications({ item, reFetch, notifications, setNotifications }) {

  const { user } = useContext(AuthContext);

  return (
    <div className='notifications-alert'>
         <Toaster
          position="bottom-right" 
          toastOptions={{ 
            style: { 
              minWidth: '400px',
              padding: '25px', // Adjust padding as needed
              background: '#fcf5f3',
              boxShadow: 'none'
            } 
          }} 
        />
       
        <div className="btns">
          {user && user.role === "A" && (
          <>
           <div className="edit button"><Link to={`/notifications/${item._id}/edit`}><UilPen /></Link></div>
          <div className="delete button" onClick={() => handleDelete(item._id, notifications, setNotifications)}><UilTrashAlt /></div>
          </>
          )} 
        </div>
        <p className="title">{item.title}</p>
        <div className="messages">
            <p>{item.description}</p>
        </div>

    </div>
  )
}

export default Notifications;