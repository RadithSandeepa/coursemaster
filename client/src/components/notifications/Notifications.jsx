import "./notifications.scss";

function Notifications({item}) {
  return (
    <div className='notifications-alert'>
        <p className="title">{item.title}</p>
        <div className="messages">
            <p>{item.description}</p>
        </div>
    </div>
  )
}

export default Notifications;