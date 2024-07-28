import { useContext } from "react";
import "./sidebar.scss";
import {UilEstate,  UilFileInfoAlt,  UilUser,  UilBuilding, UilBox, UilFileCheck, UilBook, UilSignout} from '@iconscout/react-unicons';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";


const Sidebar = () => {

    const { user, dispatch } = useContext(AuthContext);

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
    <div className="sidebar">
        <div className="logo">
            <img src="/logo.png" alt="" />
            <span>Coursera</span>
        </div>
        <div className="menu">
        {user && user.role === "A" && (
            <>
            <Link to="/">
            <div className="menuItem">
                <div className="icon">
                    <UilEstate />
                </div>
                <span>Dashboard</span>
            </div>
            </Link>
            <Link to="/courses">
            <div className="menuItem">
                <div className="icon">
                    <UilFileInfoAlt />
                </div>
                <span>Courses</span>
            </div>
            </Link>
            <Link to="/users">
            <div className="menuItem">
                <div className="icon">
                    <UilUser />
                </div>
                <span>Users</span>
            </div>
            </Link>
            <Link to="/rooms">
            <div className="menuItem">
                <div className="icon">
                    < UilBuilding />
                </div>
                <span>Rooms</span>
            </div>
            </Link>
            <Link to="/resources">
            <div className="menuItem">
                <div className="icon">
                    <UilBox />
                </div>
                <span>Resources</span>
            </div>
            </Link>
            <Link to="/enrollments">
            <div className="menuItem">
                <div className="icon">
                    <UilFileCheck />
                </div>
                <span>Enrollments</span>
            </div>
            </Link>
            <Link to="/bookings">
            <div className="menuItem">
                <div className="icon">
                    <UilBook />
                </div>
                <span>Bookings</span>
            </div>
            </Link>
            </>
             )}
            {user && user.role === "F" && (
            <>
             <Link to="/courses/mycourses">
            <div className="menuItem">
                <div className="icon">
                    <UilFileInfoAlt />
                </div>
                <span>My Courses</span>
            </div>
            </Link>
            <Link to="/bookings/mybookings">
            <div className="menuItem">
                <div className="icon">
                    <UilBook />
                </div>
                <span>My Bookings</span>
            </div>
            </Link>
            </>
            )}
            <div className="menuItem" onClick={handleLogout}>
                <div className="icon">
                    <UilSignout />
                </div>
                <span>Sign Out</span>
            </div>
        </div>
    </div>
  )
}

export default Sidebar;