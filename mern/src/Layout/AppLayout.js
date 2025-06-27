// src/Layout/AppLayout.js
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/userSlice';

const AppLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.userDetails);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">MyApp</NavLink>

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

              {!user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">Signup</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/links">Links</NavLink>
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

      {/* Page Content */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
