// AppLayout.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppLayout = ({ children, userDetails, updateUserDetails }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5001/auth/logout", {}, { withCredentials: true });
      updateUserDetails(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#f0f0f0',
        borderBottom: '1px solid #ccc',
      }}>
        <div>
          {userDetails && (
            <button onClick={handleLogout} style={{ marginRight: '1rem' }}>
              Logout
            </button>
          )}
        </div>

        <nav>
          <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        </nav>
      </header>

      <main style={{ padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
