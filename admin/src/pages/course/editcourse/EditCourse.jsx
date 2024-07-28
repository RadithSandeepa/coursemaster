import toast, { Toaster } from "react-hot-toast";
import "./editcourse.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";

const EditCourse = () => {
    const { id } = useParams();
    const { data: courseData, loading, error } = useFetch(`/courses/${id}`);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [info, setInfo] = useState({
        name: "",
        code: "",
        header: "",
        credits: "",
        description: "",
      });
  
      useEffect(() => {
        if (courseData) {
            setInfo({
                name: courseData.name || "",
                code: courseData.code || "",
                header: courseData.header || "",
                credits: courseData.credits || "",
                description: courseData.description || "",
            });
        }
    }, [courseData]);

    if (loading) {
        return (
          <div className="editcourse">
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
       console.log(info);
    }
  
    const handleClick = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        const { name, header, credits, description } = info;
    
        if (!name.trim() || !header.trim() || !description.trim()) {
          toast.error("Please fill in all fields");
          setIsSubmitting(false);
          return;
        }
        if (isNaN(credits) || credits < 0 || credits > 5) {
          toast.error("Credits must be a number between 0 and 5");
          setIsSubmitting(false);
          return;
        }

        try{
          await axios.put(`/courses/${id}`, info);
          toast.success("Record Updated successfully");
        }catch(err){
          console.log(err);
          toast.error("Failed to update course. Please try again later.");
        } finally {
          setIsSubmitting(false);
        }
      }

  return (
    <div className="editcourse">
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
            <h1 className="title">Edit Course Data</h1>
            <div className="form-container">
              <form >
                <div className="formInput">
                  <label>Course Name</label>
                  <input type="text" placeholder="Introduction to Computer Science" id="name" onChange={handleChange} value={info.name} />
                </div>
                <div className="formInput">
                  <label>Course ID</label>
                  <input type="text" placeholder="CS101" id="code" value={info.code} disabled/>
                </div>
                <div className="formInput">
                  <label>Headline</label>
                  <input type="text" placeholder="Learn the Fundamentals of Programming" id="header" onChange={handleChange} value={info.header} />
                </div>
                <div className="formInput">
                  <label>Credits</label>
                  <input type="number" placeholder="Course Credits" id="credits" onChange={handleChange} value={info.credits} />
                </div>
                <div className="formInput">
                  <label>Description</label>
                  <textarea placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore, quae." id="description" onChange={handleChange} value={info.description} />
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

export default EditCourse;