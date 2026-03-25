function AdminNotifications() {

   const [notifications,setNotifications] = useState([]);
  // Dummy notifications (replace with API later)
 
  return (
    <div className="container mt-5 pt-5">
      <h3 className="mb-4">🔔 Admin Notifications</h3>

      {notifications.length === 0 ? (
        <p className="text-muted">No notifications yet</p>
      ) : (
        <div className="list-group">
          {notifications.map((note) => (
            <div
              key={note.id}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              {/* 🔹 Left Side (Image + Message) */}
              <div className="d-flex align-items-center">
                <img
                  src={note.image}
                  alt="user"
                  className="rounded-circle me-3"
                  width="40"
                  height="40"
                />
                <div>
                  <p className="mb-1 fw-semibold">{note.message}</p>
                  {/* <small className="text-muted">{note.time}</small> */}
                </div>
              </div>

              {/* 🔹 Badge */}
              <span className="badge bg-primary rounded-pill">New</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminNotifications;