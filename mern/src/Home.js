// Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Home Page</h1>
      <Link to="/login" className="btn btn-primary mt-3">Go to Login</Link>
    </div>
  );
};

export default Home;
