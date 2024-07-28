import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./profile.scss";
import { UilPen, UilPlusCircle } from '@iconscout/react-unicons';
import Notifications from "../../components/notifications/Notifications";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import  { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { Skeleton } from "antd";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(AuthContext); // Get the user object from the AuthContext
  const id = user ? user.details._id : null;
  const { data, loading, error } = useFetch(`/users/${id}`);
  const {data: notificationData, loading: notificationLoading, error: notificationError } = useFetch("/notifications");
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [info, setInfo] = useState({
    password: ""
  });
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (notificationData) {
      setNotifications(notificationData);
    }
  }, [notificationData]);
  

  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
}

  const handleClick = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!info.password) {
      toast.error("Please enter a password.");
      setIsSubmitting(false);
      return;
    }

    try{
      await axios.put(`/users/${id}/update-password`, info);
      toast.success("Password updated successfully");
    }catch(err){
      console.log(err);
      toast.error("Failed to update password. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (error || notificationError) {
    toast.error("Unknown error occurred!");
  }

  const getStatus = (role) => {
    switch (role) {
      case "A":
        return "Admin";
      case "F":
        return "Faculty";
      default:
        return "Unknown";
    }
  };  

  return (
    <div className="profile">
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
          <div className="box">
            <div className="leftbox">
              <div className="wrapper">
                    <div className="title">
                      <h1>{loading ? 'Loading...' : 'User Information'}</h1>
                      <span className="btnContainer"><tooltip title="Update Password"><UilPen onClick={() => setShowPasswordField(prevState => !prevState)} className="edit"/></tooltip></span>
                    </div>
                    <div className="info">
                      <span>Id : <b>{data.Id}</b></span>
                      <span>E-mail : <b>{data.email}</b></span>
                      <span>Status : <b>{getStatus(data.role)}</b></span>
                    </div>
                    {showPasswordField && (
                      <div className="password-field">
                        <input type="password" placeholder="Enter new password" id="password" onChange={handleChange}/>
                        <button disabled={isSubmitting} onClick={handleClick}>Update</button>
                      </div>
                    )}
              </div>
            </div>
            <div className="rightbox">
              <div className="title">
                <h1>Notifications</h1> 
                <span className="btnContainer"><tooltip title="Add Notification"><Link to="/notifications/add"><UilPlusCircle className="add"/></Link></tooltip></span>
              </div>
              <div className="notifications">
              {notificationLoading ? (
                  <Skeleton active paragraph={{rows: 8}}/>
                ) : (
                notifications.map((item, index) => (
                  <Notifications key={index} item={item} notifications={notifications} setNotifications={setNotifications}/>
                ))
              )}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Profile;