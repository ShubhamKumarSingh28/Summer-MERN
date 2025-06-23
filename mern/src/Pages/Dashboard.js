// Dashboard.js
import React from 'react';

function Dashboard({ userDetails }) {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome, {userDetails?.name || "User"}!</h1>
      <p>Your email: {userDetails?.email || "N/A"}</p>
    </div>
  );
}

export default Dashboard;
