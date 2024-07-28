import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';  
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import List2 from './pages/list2/List2';
import { AuthContext } from './context/AuthContext';
import { useContext, useEffect } from 'react';
import { bookingColumns, courseColumns, enrollmentColumns, pendingBookingColumns, pendingEnrollmentColumns, resourceColumns, roomColumns, userColumns } from './data/columns';
import axios from 'axios';
import NewCourse from './pages/course/newcourse/NewCourse';
import NewUser from './pages/user/newuser/NewUser';
import NewResource from './pages/resource/newresource/NewResource';
import NewRoom from './pages/room/newroom/NewRoom';
import SingleRoom from './pages/room/singleroom/SingleRoom';
import NewEnrollment from './pages/enrollment/newenrollment/NewEnrollment';
import SingleCourse from './pages/course/singlecourse/SingleCourse';
import EditCourse from './pages/course/editcourse/EditCourse';
import SingleUser from './pages/user/singleuser/SingleUser';
import EditUser from './pages/user/edituser/EditUser';
import SingleEnrollment from './pages/enrollment/singleenrolllment/SingleEnrollment';
import EditRoom from './pages/room/editroom/EditRoom';
import SingleResource from './pages/resource/singleresource/SingleResource';
import EditResource from './pages/resource/editresource/EditResource';
import SingleBooking from './pages/booking/singlebooking/SingleBooking';
import NewNotification from './pages/notifications/newnotification/NewNotification';
import EditNotification from './pages/notifications/editnotification/EditNotification';
import Pending from './pages/pending/Pending';
import MyCourses from './pages/faculty/mycourses/MyCourses';
import MyBookings from './pages/faculty/mybookings/MyBookings';
import AddContent from './pages/faculty/addcontent/AddContent';
import EditBooking from './pages/faculty/editbooking/EditBooking';
import AddBooking from './pages/faculty/addbooking/AddBooking';

function App() {

  const { dispatch } = useContext(AuthContext);  
  useEffect(() => {
    const interval = setInterval(async () => {
     const tokenExpiresAt = new Date(localStorage.getItem('tokenExpiration'));
       const currentTime = new Date();
      if ( currentTime > tokenExpiresAt) {
        localStorage.removeItem("user");
        await axios.post("/auth/logout");
        dispatch({ type: "LOGOUT" });
      }
    }, 6000); // Check every 1 minute

    return () => clearInterval(interval);
  }, []);


  const AdminProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    
    if(!user){
      return <Navigate to="/login" />
    }

    if (user.role !== 'A') {
      return <Navigate to="/courses/mycourses" />;
  }
    return children;
  }

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    
    if(!user){
      return <Navigate to="/login" />
    }
    return children;
  }
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route index element={<AdminProtectedRoute><Home /></AdminProtectedRoute>} />
            <Route path="courses">
              <Route path="mycourses">
                <Route  index element={<ProtectedRoute><MyCourses columns={courseColumns}/></ProtectedRoute>} />
                <Route path=":id" element={<ProtectedRoute><AddContent/></ProtectedRoute>}/>
              </Route>
              <Route index element={<AdminProtectedRoute><List2 columns={courseColumns}/></AdminProtectedRoute>} />
              <Route path="add" element={<AdminProtectedRoute><NewCourse title="Add New Course"/></AdminProtectedRoute>} />
              <Route path=":id">
               <Route index element={<AdminProtectedRoute><SingleCourse /></AdminProtectedRoute>} />
               <Route path="edit" element={<AdminProtectedRoute><EditCourse /></AdminProtectedRoute>} />
              </Route> 
            </Route>
            <Route path="users">
              <Route index element={<AdminProtectedRoute><List2 columns={[...userColumns]}/></AdminProtectedRoute>} />
              <Route path="add" element={<AdminProtectedRoute><NewUser title="Add New User"/></AdminProtectedRoute>} />
              <Route path=":id">
               <Route index element={<AdminProtectedRoute><SingleUser /></AdminProtectedRoute>} />
               <Route path="edit" element={<AdminProtectedRoute><EditUser /></AdminProtectedRoute>} />
              </Route> 
            </Route>
            <Route path="rooms">
              <Route index element={<AdminProtectedRoute><List2 columns={[...roomColumns]}/></AdminProtectedRoute>} />
              <Route path="add" element={<AdminProtectedRoute><NewRoom title="Add New Room"/></AdminProtectedRoute>} />
              <Route path=":id">
              <Route index element={<AdminProtectedRoute><SingleRoom/></AdminProtectedRoute>} />
              <Route path="edit" element={<AdminProtectedRoute><EditRoom /></AdminProtectedRoute>} />
              </Route> 
            </Route>
            <Route path="resources">
              <Route index element={<AdminProtectedRoute><List2 columns={[...resourceColumns]}/></AdminProtectedRoute>} />
              <Route path="add" element={<AdminProtectedRoute><NewResource title="Add New Resource"/></AdminProtectedRoute>} />
              <Route path=":id">
              <Route index element={<AdminProtectedRoute><SingleResource/></AdminProtectedRoute>} />
              <Route path="edit" element={<AdminProtectedRoute><EditResource /></AdminProtectedRoute>} />
              </Route> 
            </Route>
            <Route path="enrollments">
              <Route index element={<AdminProtectedRoute><List2 columns={[...enrollmentColumns]}/></AdminProtectedRoute>} />
              <Route path="add" element={<AdminProtectedRoute><NewEnrollment title="Add New Enrollment"/></AdminProtectedRoute>} />
              <Route path="pending" element={<AdminProtectedRoute><Pending columns={[...pendingEnrollmentColumns]}/></AdminProtectedRoute>} />
              <Route path=":id">
               <Route index element={<AdminProtectedRoute><SingleEnrollment /></AdminProtectedRoute>} />
              </Route> 
            </Route>
            <Route path="bookings">
              <Route path="mybookings">
                <Route index element={<ProtectedRoute><MyBookings columns={[...bookingColumns]}/></ProtectedRoute>} />
                <Route path=":id" element={<ProtectedRoute><EditBooking /></ProtectedRoute>}/>
                <Route path="add" element={<ProtectedRoute><AddBooking/></ProtectedRoute>} />
              </Route> 
              <Route index element={<AdminProtectedRoute><List2 columns={[...bookingColumns]}/></AdminProtectedRoute>} />
              <Route path="pending" element={<AdminProtectedRoute><Pending columns={[...pendingBookingColumns]}/></AdminProtectedRoute>} />
              <Route path=":id">
              <Route index element={<AdminProtectedRoute><SingleBooking/></AdminProtectedRoute>} />
              </Route> 
            </Route>
            <Route path="notifications">
              <Route path="add" element={<ProtectedRoute><NewNotification title="Add New Notification"/></ProtectedRoute>} />
              <Route path=":id">
              <Route path="edit" element={<AdminProtectedRoute><EditNotification /></AdminProtectedRoute>} />
              </Route> 
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
