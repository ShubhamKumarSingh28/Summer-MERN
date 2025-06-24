// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ userDetails }) => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to the Home Page</h1>
      {userDetails ? (
        <div>
          <p>You are logged in as <strong>{userDetails.name}</strong>.</p>
          <Link to="/dashboard">Go to Dashboard</Link>
        </div>
      ) : (
        <div>
          <p>Please log in or sign up to continue:</p>
          <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
