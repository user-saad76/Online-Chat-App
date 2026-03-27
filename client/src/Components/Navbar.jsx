
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useState } from "react";
import socket from "../utlis/socket";

function Navbar() {
  const { user, logout } = useAuth();

  const [count, setCount] = useState(0);

  // ✅ Load notifications count on mount
  useEffect(() => {
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      const parsed = JSON.parse(storedNotifications);
      setCount(parsed.length);
    }
  }, []);

  // ✅ Listen for new notifications (real-time)
  useEffect(() => {
    const handleNewMessage = (data) => {
      setCount((prev) => {
        const updated = prev + 1;

        // also update localStorage (important sync)
        const stored = JSON.parse(localStorage.getItem("notifications")) || [];
        const updatedNotifications = [...stored, data];
        localStorage.setItem("notifications", JSON.stringify(updatedNotifications));

        return updated;
      });
    };

    socket.on("new-message", handleNewMessage);

    return () => {
      socket.off("new-message", handleNewMessage);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
      <div className="container">

        <a className="navbar-brand fw-bold" href="/">
          💬 ChatConnect
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#chatNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="chatNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/home">Home</Link>
            </li>
          </ul>

          <div className="d-flex gap-2">

            {user?.data ? (
              <>
                {/* 🔔 Notification Icon */}
                <Link to="/admin-notifications" className="btn position-relative">
                  <i className="bi bi-bell fs-5"></i>

                  {count > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {count}
                    </span>
                  )}
                </Link>

                <Link to="/profile-page" className="btn btn-outline-primary px-4">
                  {user.data.name}
                </Link>

                <button onClick={logout} className="btn btn-outline-primary px-4">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/sign-in" className="btn btn-outline-primary px-4">
                  Sign In
                </Link>
                <Link to="/sign-up" className="btn btn-primary px-4">
                  Sign Up
                </Link>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;