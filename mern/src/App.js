// App.js
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import AppLayout from './Layout/AppLayout';
import Dashboard from './Pages/Dashboard';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateUserDetails = (details) => {
    setUserDetails(details);
  };

  useEffect(() => {
    const isUserLoggedIn = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/auth/is-user-logged-in",
          { withCredentials: true }
        );
        updateUserDetails(response.data.user);
      } catch (error) {
        console.log("Not logged in:", error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    isUserLoggedIn();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout userDetails={userDetails} updateUserDetails={updateUserDetails}>
            <Home userDetails={userDetails} />
          </AppLayout>
        }
      />
      <Route
        path="/login"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <AppLayout userDetails={userDetails} updateUserDetails={updateUserDetails}>
              <Login updateUserDetails={updateUserDetails} />
            </AppLayout>
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          userDetails ? (
            <AppLayout userDetails={userDetails} updateUserDetails={updateUserDetails}>
              <Dashboard userDetails={userDetails} />
            </AppLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
