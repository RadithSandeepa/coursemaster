import { useState } from "react";
import "./filter.scss";



function Filter() {
    const [type, setType] = useState("Back");

  return (
    <div className="filter">
        <h1>Search results for <b>Robotics</b></h1>
        <div className="type">
            <button className={type === "Back" ? "active" : ""} onClick={() => setType("Back")}>All Courses</button>
            <button className={type === "myCourses" ? "active" : ""} onClick={() => setType("myCourses")}>My Courses</button>
        </div>
        <div className="bottom">
                <input type="text" id="course" name="course" placeholder="Search courses" />
                <button>
                    <img src="/search.png" alt="" />
                </button>
        </div>
    </div>
  )
}

export default Filter;