function Navbar() {
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
              <a className="nav-link active" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/features">
                Features
              </a>
            </li>
          </ul>

          {/* Auth Buttons */}
          <div className="d-flex gap-2">
            <a href="/signin" className="btn btn-outline-primary px-4">
              Sign In
            </a>
            <a href="/signup" className="btn btn-primary px-4">
              Sign Up
            </a>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
