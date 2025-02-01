import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SendRequests from "./components/SendRequest";
import ViewRequest from "./components/ViewRequest";
import AcceptedRequests from "./components/AcceptedRequest";

import Analytics from "./components/Analytics";
import CreateCampaign from "./components/CreateCampaign";
import ViewCampaigns from "./components/ViewCampaign";
import Spinner from "./components/Spinner";
import "leaflet/dist/leaflet.css";
import DonationStatistics from "./components/AdminDashboard/DonationStatistics";
import UserManagement from "./components/AdminDashboard/UserManagement";

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <ToastContainer />
      {loading && <Spinner />}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <PrivateRoute>
            <Homepage />
          </PrivateRoute>
        } />
        <Route path="/create-bloodrequest" element={
          <PrivateRoute>
            <SendRequests />
          </PrivateRoute>
        } />
        <Route path="/view-requests" element={
          <PrivateRoute>
            <ViewRequest />
          </PrivateRoute>
        } />
        <Route path="/donation-records" element={
          <PrivateRoute>
            <Homepage />
          </PrivateRoute>
        } />
        <Route path="/accepted-requests" element={
          <PrivateRoute>
            <AcceptedRequests />
          </PrivateRoute>
        } />
        <Route path="/user-records" element={
          <PrivateRoute>
            <UserManagement />
          </PrivateRoute>
        } />
        <Route path="/analytics" element={
          <PrivateRoute>
            <Analytics />
          </PrivateRoute>
        } />
        <Route path="/create-campaign" element={
          <PrivateRoute>
            <CreateCampaign />
          </PrivateRoute>
        } />
        <Route path="/view-campaigns" element={
          <PrivateRoute>
            <ViewCampaigns />
          </PrivateRoute>
        } />
        
        <Route path="/donation-statistics" element={
          <PrivateRoute>
            <DonationStatistics />
          </PrivateRoute>
        } />
        
        {/* Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;