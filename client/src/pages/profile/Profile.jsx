
import BookedList from "../../components/bookedlist/BookedList";
import "./profile.scss";
import { dummyNotifications } from "../../lib/dummyData";
import Notifications from "../../components/notifications/Notifications";

function Profile() {

  const data = dummyNotifications;

  return (
    <div className="profile">
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>User Information</h1>
                        <button>Update</button>
                    </div>
                    <div className="info">
                        <span>Username : <b>John Doe</b></span>
                        <span>E-mail : <b>John@gmail.com</b></span>
                    </div>
                    <div className="title">
                        <h1>Event Bookings</h1>
                        <button>Add Booking</button>
                    </div>
                    <BookedList className="list"/>
                    <div className="title">
                        <h1>Saved Courses</h1>
                    </div>
                    <BookedList className="list"/>
                </div>
            </div>
            <div className="notifications">
                <div className="wrapper">
                    <h1>Notifications</h1>
                    {data && data.map(item => (
                    <Notifications key={item.title} item={item}/>
                    ))}
                </div>   
            </div>
    </div>
  )
}

export default Profile;