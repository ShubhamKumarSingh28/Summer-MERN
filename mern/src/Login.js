// src/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { serverEndpoint } from "./config";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage(null);

    try {
      const res = await axios.post(
        `${serverEndpoint}/auth/login`,
        formData,
        { withCredentials: true }
      );

      dispatch(setUser(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.data?.errors) {
        // Validation errors from server
        const serverErrors = {};
        err.response.data.errors.forEach((error) => {
          serverErrors[error.param] = error.msg;
        });
        setErrors(serverErrors);
      } else if (err.response?.data?.message) {
        // Other server messages (e.g. invalid credentials)
        setMessage(err.response.data.message);
      } else {
        setMessage("Login failed. Please try again.");
      }
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setMessage(null);
    try {
      // Decode token if you want user info here:
      // const decoded = jwtDecode(credentialResponse.credential);

      const res = await axios.post(
        `${serverEndpoint}/auth/google-login`,
        {
          credential: credentialResponse.credential,
        },
        { withCredentials: true }
      );

      dispatch(setUser(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setMessage("Google login failed.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Login</h2>

      {message && <div className="alert alert-danger">{message}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>

      <div className="text-center mt-4">
        <p>Or login with</p>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => setMessage("Google login failed")}
        />
      </div>
    </div>
  );
};

export default Login;
