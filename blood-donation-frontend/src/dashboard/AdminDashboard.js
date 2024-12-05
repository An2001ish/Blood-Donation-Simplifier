import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/');
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <p>Welcome to the Admin Dashboard. Here you can manage users and view system statistics.</p>
    </div>
  );
};

export default AdminDashboard;

