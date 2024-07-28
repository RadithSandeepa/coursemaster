import { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./newroom.scss";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


const NewRoom= ({title}) => {

  const [info, setInfo] = useState({
    code: "",
    location: "",
    type: "",
    capacity: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
      setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { code, location, type } = info;

    if (!code.trim() || !location.trim() || !type.trim()) {
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post("/rooms", info);
      toast.success("Room added successfully");
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 403) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to add room. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="newroom">
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
                <label>Room Id</label>
                <input type="text" placeholder="RC1234" id="code" onChange={handleChange} />
                </div>
                <div className="formInput">
                <label>Location</label>
                  <input type="text" placeholder="6th floor(Main Building)"  id="location" onChange={handleChange}/>
                </div>
                <div className="formInput">
                  <label>Capacity</label>
                  <input type="number" placeholder="400" id="capacity" onChange={handleChange}/>
                </div>
                <div className="formInput">
                  <label>Type</label>
                  <select 
                    id="type"
                    onChange={handleChange}
                    value={info.type} // Set selected value from state
                  >
                    <option value="">Select a type</option>
                    <option value="Lecture Hall">Lecture Hall</option>
                    <option value="Lab">Lab</option>
                    <option value="Classroom">Classroom</option>
                  </select>
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

export default NewRoom;
