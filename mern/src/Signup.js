import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { serverEndpoint } from "./config";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage(null);

    const birthDate = `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`;

    try {
      const res = await axios.post(
        `${serverEndpoint}/auth/signup`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          birthDate,
        },
        { withCredentials: true }
      );

      dispatch(setUser(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.data?.errors) {
        const serverErrors = {};
        err.response.data.errors.forEach((error) => {
          serverErrors[error.param] = error.msg;
        });
        setErrors(serverErrors);
      } else {
        setMessage("Signup failed. Please try again.");
      }
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const res = await axios.post(
        `${serverEndpoint}/auth/google-login`,
        {
          token: credentialResponse.credential,
        },
        { withCredentials: true }
      );

      dispatch(setUser(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setMessage("Google signup failed.");
    }
  };

  const renderSelect = (name, label, options) => (
    <div className="col">
      <label>{label}</label>
      <select
        className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        name={name}
        value={formData[name]}
        onChange={handleChange}
      >
        <option value="">{label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Sign Up</h2>

      {message && <div className="alert alert-danger">{message}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="row mb-3">
          <div className="col">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>
          <div className="col">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="row mb-3">
          {renderSelect("birthDay", "Day", Array.from({ length: 31 }, (_, i) => i + 1))}
          {renderSelect("birthMonth", "Month", Array.from({ length: 12 }, (_, i) => i + 1))}
          {renderSelect(
            "birthYear",
            "Year",
            Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
          )}
        </div>

        <div className="row mb-3">
          <div className="col">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="col">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-success w-100">
          Sign Up
        </button>
      </form>

      <div className="text-center mt-4">
        <p>Or sign up with</p>
        <GoogleLogin onSuccess={handleGoogleSignup} onError={() => setMessage("Google signup failed")} />
      </div>
    </div>
  );
};

export default Signup;
