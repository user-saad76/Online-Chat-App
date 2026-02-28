import { Link } from "react-router-dom";
function Navbar() {
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
            <li className="nav-item">
              <a
                href="#"
                className="nav-link position-relative fs-5 text-white"
              >
                <i className="fa-solid fa-bell"></i>

                {/* Badge */}
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.65rem" }}
                >
                  3
                </span>
              </a>
            </li>

            {/* Sign In */}
            <li className="nav-item">
              <Link
                to ="/sign-in"
                className="btn btn-outline-light px-4 rounded-pill"
              >
                Sign In
              </Link>
            </li>

            {/* Sign Up */}
            <li className="nav-item">
              <Link
                to ="/sign-up"
                className="btn btn-primary px-4 rounded-pill shadow-sm"
              >
                Sign Up
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;