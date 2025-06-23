// Login.js
import React, { useState, Fragment } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import './Login.css';

const SocialLoginButton = () => (
  <Fragment>
    <Button variant="primary" className="ezy__signin11-btn w-100 d-flex align-items-center mb-3">
      <span className="text-white fs-4 lh-1">
        <FontAwesomeIcon icon={faFacebook} />
      </span>
      <span className="w-100 text-center text-white">Continue with Facebook</span>
    </Button>
    <Button variant="danger" className="ezy__signin11-btn w-100 d-flex align-items-center">
      <span className="text-white fs-4 lh-1">
        <FontAwesomeIcon icon={faGoogle} />
      </span>
      <span className="w-100 text-center text-white">Continue with Google</span>
    </Button>
  </Fragment>
);

const LoginForm = ({ onLogin, errors, message, handleChange, formData }) => (
  <Form className="pe-md-4" onSubmit={onLogin} noValidate>
    {message && <p className="text-danger">{message}</p>}

    <Form.Group className="mb-4 mt-2">
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"
        name="username"
        placeholder="Enter Username"
        value={formData.username}
        onChange={handleChange}
        isInvalid={!!errors.username}
      />
      <Form.Control.Feedback type="invalid">
        {errors.username}
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-2 mt-2">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        name="password"
        placeholder="Enter Password"
        value={formData.password}
        onChange={handleChange}
        isInvalid={!!errors.password}
      />
      <Form.Control.Feedback type="invalid">
        {errors.password}
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Check type="checkbox" label="Remember me" />
    </Form.Group>

    <Button type="submit" className="ezy__signin11-btn-submit w-100">Log In</Button>
    <Button type="button" className="w-100">Forgot your password?</Button>
  </Form>
);

const Login = ({ updateUserDetails }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const body = {
        username: formData.username,
        password: formData.password
      };
      const config = {
        withCredentials: true
      };
      try {
        const response = await axios.post(
          "http://localhost:5001/auth/login",
          body,
          config
        );
        updateUserDetails(response.data.user); // ✅ Fixed: uses returned user object
      } catch (error) {
        console.log(error);
        setMessage("Login failed");
      }
    }
  };

  return (
    <section className="ezy__signin11 light d-flex">
      <Container>
        <Row className="justify-content-between h-100">
          <Col md={4} lg={6}>
            <div
              className="ezy__signin11-bg-holder d-none d-md-block h-100"
              style={{
                backgroundImage: "url(https://cdn.easyfrontend.com/pictures/sign-in-up/sign5.jpg)",
              }}
            />
          </Col>
          <Col md={8} lg={6} className="py-4">
            <div className="px-4">
              <Card className="ezy__signin11-form-card">
                <Card.Body className="p-md-5">
                  <h2 className="ezy__signin11-heading mb-3">Welcome to Easy Frontend</h2>
                  <p className="mb-4 mb-md-5">
                    <span className="mb-0 opacity-50 lh-1">Don't have an account?</span>
                    <Button variant="link" className="py-0 text-dark text-decoration-none">
                      Create account
                    </Button>
                  </p>

                  <LoginForm
                    onLogin={handleSubmit}
                    errors={errors}
                    message={message}
                    handleChange={handleChange}
                    formData={formData}
                  />

                  <div className="position-relative ezy__signin11-or-separator">
                    <hr className="my-4 my-md-5" />
                    <span className="px-2">Or</span>
                  </div>

                  <SocialLoginButton />
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
