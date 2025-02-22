import { Link, Outlet } from "react-router-dom";

// Navigation component with navigation links and a dynamic outlet for nested routes
const Navigation = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* Link to the home page */}
          <Link className="navbar-brand" to="/">
            <h1 style={{ color: "white" }}>Employee Management System</h1>
          </Link>
          {/* Navbar toggler for mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {/* Link to the Directory page */}
              <Link
                className="nav-link active"
                to="/"
                style={{
                  background: "white",
                  color: "black",
                  marginRight: "10px",
                }}
              >
                Directory
              </Link>
              {/* Link to the Create Employee page */}
              <Link
                className="nav-link"
                to="/employee_create"
                style={{
                  background: "white",
                  color: "black",
                  marginRight: "10px",
                }}
              >
                Create
              </Link>
              <Link
                className="nav-link"
                to="/upcoming_retirement"
                style={{
                  background: "white",
                  color: "black",
                  marginRight: "10px",
                }}
              >
                UpComing Retirement
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Outlet for rendering nested routes */}
      <Outlet />
    </div>
  );
};

export default Navigation;
