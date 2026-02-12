import { data, Link } from "react-router";
import { useAuth } from "../contexts/AuthProvider";

function Navbar() {
  //console.log('user information',data);

      const {user}= useAuth()
      console.log("user information",user);
      
  return (
    <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
      <div className="container">

        {/* Logo */}
        <a className="navbar-brand fw-bold" href="/">
          💬 ChatConnect
        </a>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#chatNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="chatNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/features">
                Features
              </a>
            </li>
          </ul>

          {/* Auth Buttons */}
          <div className="d-flex gap-2">

          {
              user?(
              <>
                 <Link className="btn btn-outline-primary px-4">
                {user.name}
               </Link>
                <Link to ="/sign-in" className="btn btn-outline-primary px-4">
                 Log out
                </Link>
              </>
              ):(
                <>
                  <Link to ="/sign-in" className="btn btn-outline-primary px-4">
              Sign In
            </Link>
            <Link to ="/sign-up" className="btn btn-primary px-4">
              Sign Up
            </Link>
                </>            
              )
          }
 
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
