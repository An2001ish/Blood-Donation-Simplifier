import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/OrganizationDashboard.css';

const OrganizationDashboard = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/');
  };

  return (
    <div className="organization-dashboard">
      <h1>Organization Dashboard</h1>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <p>Welcome to the Organization Dashboard. Here you can manage blood donation campaigns and view donation statistics.</p>
    </div>
  );
};

export default OrganizationDashboard;

