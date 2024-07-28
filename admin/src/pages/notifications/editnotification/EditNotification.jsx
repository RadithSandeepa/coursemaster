import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./editnotification.scss";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";

const EditNotification= () => {
    const { id } = useParams();
    const { data: notificationeData, loading, error } = useFetch(`/notifications/${id}`);
  const [info, setInfo] = useState({
    title: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (notificationeData) {
        setInfo({
            title: notificationeData.title || "",
            description: notificationeData.description || "",
        });
    }
}, [notificationeData]);

    if (loading) {
        return (
        <div className="editnotification">
            <Sidebar />
            <div className="right">
                <Navbar />
                <div className="container">
                    <h1 className="title">Loading...</h1>
                </div>
            </div>
        </div>
        );
    }

    if (error) {
        toast.error("Unknown error occurred!");
    }

  const handleChange = (e) => {
      setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { title, description } = info;

    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.put(`/notifications/${id}`, info);
      toast.success("Record Updated successfully");
    } catch (err) {
      console.log(err);
        toast.error("Failed to update resource. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="editnotification">
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
            <h1 className="title">Edit Notification Data</h1>
            <div className="form-container">
              <form >
              <div className="formInput">
                <label>Notification Title</label>
                <input type="text" placeholder="Enter notification title" id="title" onChange={handleChange} value={info.title}/>
                </div>
                <div className="formInput">
                <label>Notification Description</label>
                <input type="text" placeholder="Enter notification description" id="description" onChange={handleChange} value={info.description}/>
                </div>
               </form>
              <div className="bottom">
                 <button disabled={isSubmitting} onClick={handleClick} className="btn">Submit</button>
              </div>
            </div>   
        </div>
    </div>
  )
}

export default EditNotification;
