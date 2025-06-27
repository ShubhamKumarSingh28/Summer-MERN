// Home.js
import React from "react";
import { useSelector } from "react-redux";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector((state) => state.user.userDetails);

  return (
    <Container className="text-center mt-5">
      {user ? (
        <>
          <h1>Welcome back, {user.name}!</h1>
          <p>You're logged in with {user.email}</p>
          <Link to="/dashboard">
            <Button variant="primary" className="mt-3">
              Go to Dashboard
            </Button>
          </Link>
        </>
      ) : (
        <>
          <h1>Welcome to Our App!</h1>
          <p>Please log in or sign up to continue.</p>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Link to="/login">
              <Button variant="success">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline-primary">Signup</Button>
            </Link>
          </div>
        </>
      )}
    </Container>
  );
};

export default Home;
