// Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = ({ userDetails }) => {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Welcome to MyApp</h1>
      <p className="lead">
        {userDetails
          ? `Hello, ${userDetails.name}! You are logged in.`
          : "This is a demo authentication app built with React, Express, and JWT."}
      </p>

      <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
        {!userDetails && (
          <>
            <Link to="/login" className="btn btn-primary">Login</Link>
            <button className="btn btn-outline-secondary" disabled>Sign Up (Coming Soon)</button>
          </>
        )}
        {userDetails && (
          <Link to="/dashboard" className="btn btn-success">Go to Dashboard</Link>
        )}
      </div>

      <footer className="mt-5 text-muted small">
        <p>Made with ❤️ using React + Express + JWT</p>
      </footer>
    </div>
  );
};

export default Home;
