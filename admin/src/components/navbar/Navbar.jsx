import { useContext, useEffect, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { UilNotebooks, UilFolderCheck } from '@iconscout/react-unicons'
import axios from "axios";

const Navbar = () => {
  const { dispatch } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false); // Close the menu when screen size is larger than or equal to 768px
      }
    };

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to ensure effect runs only once

  const handleLogout = async () => {
    try {
        localStorage.removeItem("user");
        await axios.post("/auth/logout");
        dispatch({ type: "LOGOUT" });
        // Optionally, you can redirect the user to the login page or do any other cleanup here
    } catch (err) {
        console.log(err);
        //toast error
    }
};

  return (
    <div className="navbar">
       <div className="left">
        {user && user.role === "A" && (
            <>
          <tooltip title="Pending Bookings"><Link to="/bookings/pending"><UilNotebooks size="30" className="icon"/></Link></tooltip>
          <tooltip title="Pending Enrollments"><Link to="/enrollments/pending"><UilFolderCheck size="30" className="icon"/></Link></tooltip>
            </>
         )}
        </div>
        <div className="menuIcon">
            <img src="/menu.png" alt="" onClick={() => setOpen((prev) => !prev)}/>
        </div>
        <div className={open ? "menu active" : "menu"}>
        {user && user.role === "A" && (
          <>
            <Link to="/">Dashboard</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/users">Users</Link>
            <Link to="/rooms">Rooms</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/enrollments">Enrollments</Link>
            <Link to="/bookings">Bookings</Link>
          </>
        )}
        {user && user.role === "F" && (
          <>
            <Link to="/courses/mycourses">My Courses</Link>
            <Link to="/bookings/mybookings">My Bookings</Link>
          </>
        )}
        <Link ><span onClick={handleLogout}>Sign Out</span></Link>
        </div>
       
        <div className="right">
          <span>{user.details.Id}</span>
          <Link to="/profile" className="profile">
              <span>Profile</span>  
          </Link>
        </div> 
    </div>
  )
}

export default Navbar;