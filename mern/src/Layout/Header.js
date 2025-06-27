import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/userSlice';  // adjust path as needed

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.userDetails);

  const handleLogout = () => {
    dispatch(clearUser());
    // Optionally call backend logout API here
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MyApp</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>

            {!user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">Signup</NavLink>
                </li>
              </>
            )}

            {user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                    style={{ cursor: 'pointer' }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
