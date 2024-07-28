import { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./newenrollment.scss";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useFetch from "../../../hooks/useFetch";

const NewEnrollment = ({title}) => {

  const { data: courseCodes } = useFetch("/courses/get/codes");
  const { data: studentIds } = useFetch("/users/get/students");

  const [info, setInfo] = useState({
    studentCode: "",
    courseCode: "",
    status: ""

  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
      setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!info.studentCode || !info.courseCode || !info.status) {
      toast.error("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    try{
      await axios.post("/enrollments", info);
      toast.success("Enrollment added successfully");
    }catch(err){
      console.log(err);
      if (err.response && err.response.status === 404) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to add enrollment. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="newenrollment">
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
                    <label>Student ID</label>
                    <select
                      id="studentCode"
                      onChange={handleChange}
                      value={info.studentCode || ""}
                      defaultValue=""
                    >
                      <option value="" disabled hidden>
                        Select student ID
                      </option>
                      {studentIds &&
                        studentIds.map((studentId) => (
                          <option key={studentId} value={studentId}>
                            {studentId}
                          </option>
                        ))}
                    </select>
                </div>
                <div className="formInput">
                    <label>Course ID</label>
                    <select
                      id="courseCode"
                      onChange={handleChange}
                      value={info.courseCode || ""}
                      defaultValue=""
                    >
                      <option value="" disabled hidden>
                        Select course ID
                      </option>
                      {courseCodes &&
                        courseCodes.map((courseCode) => (
                          <option key={courseCode} value={courseCode}>
                            {courseCode}
                          </option>
                        ))}
                    </select>
                </div>
                <div className="formInput">
                  <label>Status</label>
                  <select 
                    id="status"
                    onChange={handleChange}
                    value={info.status}
                  >
                    <option value="">Select enrollment status</option>
                    <option value="P">Pending</option>
                    <option value="A">Accepted</option>
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

export default NewEnrollment;
