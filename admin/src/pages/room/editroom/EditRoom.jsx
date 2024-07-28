import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./editroom.scss";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";

const EditRoom= () => {
  const { id } = useParams();
  const { data: roomData, loading, error } = useFetch(`/rooms/${id}`);
  const [info, setInfo] = useState({
    code: "",
    location: "",
    type: "",
    capacity: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (roomData) {
        setInfo({
            code: roomData.code || "",
            location: roomData.location ||"",
            type: roomData.type || "",
            capacity: roomData.capacity ||""
        });
    }
}, [roomData]);
 
    if (loading) {
        return (
        <div className="editroom">
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

    const { code, location, type } = info;

    if (!code.trim() || !location.trim() || !type.trim()) {
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.put(`/rooms/${id}`, info);
      toast.success("Record Updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update room. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="editroom">
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
            <h1 className="title">Edit Room Data</h1>
            <div className="form-container">
              <form >
                <div className="formInput">
                <label>Room Id</label>
                <input type="text" placeholder="RC1234" id="code" onChange={handleChange} value={info.code} disabled/>
                </div>
                <div className="formInput">
                <label>Location</label>
                  <input type="text" placeholder="6th floor(Main Building)"  id="location" onChange={handleChange} value={info.location}/>
                </div>
                <div className="formInput">
                  <label>Capacity</label>
                  <input type="number" placeholder="400" id="capacity" onChange={handleChange} value={info.capacity}/>
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

export default EditRoom;
