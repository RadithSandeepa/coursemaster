import { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./newnotification.scss";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


const NewNotification= ({title}) => {

  const [info, setInfo] = useState({
    title: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      await axios.post("/notifications", info);
      toast.success("Notification added successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add notification. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="newnotification">
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
            <h1 className="title">{title}</h1>
            <div className="form-container">
              <form >
                <div className="formInput">
                <label>Notification Title</label>
                <input type="text" placeholder="Enter notification title" id="title" onChange={handleChange} />
                </div>
                <div className="formInput">
                <label>Notification Description</label>
                <input type="text" placeholder="Enter notification description" id="description" onChange={handleChange} />
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

export default NewNotification;
