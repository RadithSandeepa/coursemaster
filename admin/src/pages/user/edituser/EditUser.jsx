import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./edituser.scss";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";

const EditUser = () => {
    const { id } = useParams();
    const { data: userData, loading, error } = useFetch(`/users/${id}`);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [info, setInfo] = useState({
        Id: "",
        email: "",
    });

    useEffect(() => {
        if (userData) {
            setInfo({
                Id: userData.Id || "",
                email: userData.email || "",
            });
        }
    }, [userData]);

    if (loading) {
        return (
          <div className="edituser">
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

    const { Id, email } = info;

    const emailPrefix = email.split('@')[0];
    const lowerCaseId = Id.trim().toLowerCase();
    if (lowerCaseId.trim() !== emailPrefix) {
      toast.error("User ID must match the first part of the email before '@'");
      setIsSubmitting(false);
      return;
    }

    if (!Id.trim() || !email.trim()) {
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }
   

    try{
        await axios.put(`/users/${id}`, info);
        toast.success("Record Updated successfully");
    }catch(err){
        console.log(err);
        toast.error("Failed to update user. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="edituser">
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
            <h1 className="title">Edit User Data</h1>
            <div className="form-container">
              <form >
                <div className="formInput">
                  <label>User ID</label>
                  <input type="text" placeholder="IT21808088" id="Id" onChange={handleChange} value={info.Id}/>
                </div>
                <div className="formInput">
                  <label>User Email</label>
                  <input type="text" placeholder="IT21808088@example.com" id="email" onChange={handleChange} value={info.email}/>
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

export default EditUser;
