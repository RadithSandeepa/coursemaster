import { Link, useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import useFetch from "../../../hooks/useFetch";
import "./singlecourse.scss";
import { UilPen, UilUserPlus } from '@iconscout/react-unicons';
import  { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

const SingleCourse = () => {
  const { id } = useParams();
  const { data, loading, error, reFetch } = useFetch(`/courses/${id}`);
  const { data: facultyMembers } = useFetch("/users/get/faculty");
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);


  if (loading) {
    return (
      <div className="singlecourse">
        <Sidebar />
        <div className="right">
            <Navbar />
            <div className="container">
                <h1>Loading...</h1>
            </div>
        </div>
      </div>
    );
  }

  if (error) {
    toast.error("Unknown error occurred!");
  }

    const handleAssignButtonClick = async() => {
        try {
            if (!selectedInstructor) {
              toast.error("Please select a faculty member.");
              return;
            }
      
            await axios.post(`/courses/${id}/assign-faculty`, { facultyId: selectedInstructor });
            toast.success("Faculty Member assigned to course successfully");
            setShowDropdown(false);
            setTimeout(() => reFetch(), 3000);
           
          } catch (err) {
            console.log(err);
            toast.error("Failed to assign faculty to course. Please try again later.");
          }
    };

  return (
    <div className="singlecourse">
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
            <div className="container">
                <div className="btns">
                    <div className="btnContainer"><tooltip title="Edit"><Link to={`/courses/${id}/edit`}><UilPen className="edit"/></Link></tooltip></div>
                    <div className="btnContainer"><tooltip title="Assign a Instructor"><UilUserPlus className="assign" onClick={() => setShowDropdown(!showDropdown)}/></tooltip></div>
                </div>
               <h1>{data.name}({data.code})</h1>
               <div className="content">
                    <h3>Headline: {data.header}</h3>
                    <h3>Description: {data.description}</h3>
                    <h3>Credits: {data.credits}</h3>
                    <h3>Instructor ID: {data.faculty}</h3>
                    <h3>Bookings for Lectures: {data.bookings}</h3>
               </div>
            </div>
        </div>
        {showDropdown && (
              <div className="dropdown">
                <select value={selectedInstructor} onChange={(e) => setSelectedInstructor(e.target.value)}>
                  <option value="">Select an instructor</option>
                  {facultyMembers &&
                    facultyMembers.map((facultyId) => (
                        <option key={facultyId} value={facultyId}>
                        {facultyId}
                        </option>
                    ))
                  }
                </select>
                <button
                  disabled={!selectedInstructor}
                  onClick={handleAssignButtonClick}
                  className="btn"
                >
                  Assign
                </button>
              </div>
            )}
    </div>
  )
}

export default SingleCourse;
