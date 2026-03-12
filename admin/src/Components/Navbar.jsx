import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthAdminProvider";
import { useEffect, useState } from "react";
import socket from "../utlis/socket";
import moment from 'moment'
function Navbar() {

  const { admin, logout } = useAuth();
  console.log("admin information", admin);
  const [notifications,setNotifications] = useState([]);

  useEffect(()=>{
       const handleNewMessage = (data) =>{
          setNotifications((prev)=>[...prev,data])
             console.log("******",data); 
       };
       socket.on("new-message",handleNewMessage);
       return () =>{
        socket.off("new-message",handleNewMessage);
       }
      // socket.on('new-message',(data)=>{
      //   setNotifications((prev)=>[...prev,data])
      // })
      // socket.on("'new-message",)
  },[])


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container">

        {/* Brand */}
        <a className="navbar-brand fw-bold fs-4" href="#">
          MyApp
        </a>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">

          <ul className="navbar-nav ms-auto align-items-center gap-3">

    {/* Notification */}
    <li className="nav-item dropdown">
     <a
      href="#"
      className="nav-link position-relative fs-5 text-white"
      id="notificationDropdown"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i className="fa-solid fa-bell"></i>

    {/* Badge */}
    {notifications.length > 0 && (
      <span
        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        style={{ fontSize: "0.65rem" }}
      >
        {notifications.length}
      </span>
    )}
  </a>

  {/* Dropdown */}
  <ul
    className="dropdown-menu dropdown-menu-end shadow"
    aria-labelledby="notificationDropdown"
    style={{ width: "300px" }}
  >
    <li className="dropdown-header fw-bold">Notifications</li>

    {notifications.length === 0 ? (
      <li className="dropdown-item text-center text-muted">
        No notifications
      </li>
    ) : (
    notifications.map((notification, index) => (
  <li key={index}>
    <a href="#" className="dropdown-item d-flex align-items-start gap-2">
      <img
        src={notification.user?.image?.secure_url} // 👈 user image
        alt="user"
        className="rounded-circle"
        width="35"
        height="35"
      />
      <div>
        <div className="fw-semibold">{notification.user?.name}</div> 
        <small className="text-muted d-block">{notification.message}</small>
        <small className="text-muted d-block">
          {moment.utc(notification.createdAt).fromNow()}
        </small>
      </div>
      </a>
     </li>
     ))
    )}

    <li><hr className="dropdown-divider" /></li>

    <li>
      <a href="#" className="dropdown-item text-center fw-semibold">
        View All Notifications
      </a>
      </li>
       </ul>

        </li>
            {/* AUTH CONDITION */}
            {admin?.data ? (
              <>
                {/* Welcome Admin */}
                <li className="nav-item text-white fw-semibold">
                  Welcome, {admin.data.name}
                </li>
                  {/* Messages */}
            <li className="nav-item">
              <Link
                to="/chats"
                className="nav-link text-white fs-5"
              >
                <i className="fa-solid fa-message me-1"></i>
                Messages
              </Link>
            </li>
                {/* Logout */}
                <li className="nav-item">
                  <button
                    onClick={logout}
                    className="btn btn-danger px-4 rounded-pill"
                  >
                    Logout
                  </button>
                </li>

              </>
            ) : (
              <>
                {/* Sign In */}
                <li className="nav-item">
                  <Link
                    to="/sign-in"
                    className="btn btn-outline-light px-4 rounded-pill"
                  >
                    Sign In
                  </Link>
                </li>

                {/* Sign Up */}
                <li className="nav-item">
                  <Link
                    to="/sign-up"
                    className="btn btn-primary px-4 rounded-pill shadow-sm"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;