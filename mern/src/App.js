// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Pages/Dashboard";
import LinksPage from "./Pages/LinksPage";
import AppLayout from "./Layout/AppLayout";

function App() {
  const user = useSelector((state) => state.user.userDetails);

  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/dashboard" /> : <Signup />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard userDetails={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/links"
            element={user ? <LinksPage /> : <Navigate to="/login" />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
