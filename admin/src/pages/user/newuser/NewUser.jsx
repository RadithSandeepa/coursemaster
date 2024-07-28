import { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./newuser.scss";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const NewUser = ({title}) => {

  const [info, setInfo] = useState({
    Id: "",
    email: "",
    password: "",
    role: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
      setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { Id, email, password, role } = info;

    const emailPrefix = email.split('@')[0];
    const lowerCaseId = Id.trim().toLowerCase();
    if (lowerCaseId.trim() !== emailPrefix) {
      toast.error("User ID must match the first part of the email before '@'");
      setIsSubmitting(false);
      return;
    }

    if (!Id.trim() || !email.trim() || !password.trim() || !role.trim()) {
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }
   

    try{
      await axios.post("/auth/register", info);
      toast.success("User added successfully");
    }catch(err){
      console.log(err);
      if (err.response && err.response.status === 403) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to add user. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="newuser">
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
                  <label>User ID</label>
                  <input type="text" placeholder="IT21808088" id="Id" onChange={handleChange}/>
                </div>
                <div className="formInput">
                  <label>User Email</label>
                  <input type="text" placeholder="IT21808088@example.com" id="email" onChange={handleChange}/>
                </div>
                <div className="formInput">
                  <label>Password</label>
                  <input type="password" placeholder="Password123" id="password" onChange={handleChange}/>
                </div>
                <div className="formInput">
                  <label>Role</label>
                  <select 
                    id="role"
                    onChange={handleChange}
                    value={info.role} // Set selected value from state
                  >
                    <option value="">Select a role</option>
                    <option value="A">Administrator</option>
                    <option value="F">Faculty</option>
                    <option value="S">Student</option>
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

export default NewUser;
