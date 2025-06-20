// App.js
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import AppLayout from './Layout/AppLayout';
import Dashboard from './Pages/Dashboard';
import { useState } from 'react';

function App() {
  const [userDetails, setUserDetails] = useState(null);

  const updateUserDetails = (details) => {
    setUserDetails(details);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <AppLayout>
              <Home />
            </AppLayout>
          )
        }
      />
      <Route
        path="/login"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <AppLayout>
              <Login updateUserDetails={updateUserDetails} />
            </AppLayout>
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          userDetails ? (
            <Dashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
