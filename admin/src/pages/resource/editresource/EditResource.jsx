import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./editresource.scss";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";

const EditResource= () => {
    const { id } = useParams();
    const { data: resourceData, loading, error } = useFetch(`/resources/${id}`);
  const [info, setInfo] = useState({
    code: "",
    type: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (resourceData) {
        setInfo({
            code: resourceData.code || "",
            type: resourceData.type || "",
        });
    }
}, [resourceData]);

    if (loading) {
        return (
        <div className="editresource">
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

    const { code, type } = info;

    if (!code.trim() || !type.trim()) {
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.put(`/resources/${id}`, info);
      toast.success("Record Updated successfully");
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 403) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to update resource. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="editresource">
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
            <h1 className="title">Edit Resource Data</h1>
            <div className="form-container">
              <form >
                <div className="formInput">
                <label>Resource Id</label>
                <input type="text" placeholder="RE1234" id="code" onChange={handleChange} value={info.code} disabled/>
                </div>
                <div className="formInput">
                  <label>Type</label>
                  <select 
                    id="type"
                    onChange={handleChange}
                    value={info.type} // Set selected value from state
                  >
                    <option value="">Select a type</option>
                    <option value="Projector">Projector</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Generator">Generator</option>
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

export default EditResource;
