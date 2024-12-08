import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/API';
import MainHeader from "./MainHeader.jsx";
import "../../styles/Layout.css"

const Layout = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await api.get('/auth/current-user');
        setUserRole(response.data.user.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };
    fetchUserRole();
  }, []);

  return (
    <div className="layout">
      <div className="header">
        <MainHeader />
      </div>
      <div className="content">
        <div className="left-content">
          <nav>
            <ul>
              {userRole === 'donor' && (
                <>
                  <li><Link to="/donation-records">Donation Records</Link></li>
                  <li><Link to="/view-requests">View Requests</Link></li>
                </>
              )}
              {(userRole === 'hospital' || userRole === 'organisation') && (
                <>
                  <li><Link to="/donation-records">Donation Records</Link></li>
                  <li><Link to="/create-bloodrequest">Send Requests</Link></li>
                </>
              )}
            </ul>
          </nav>
        </div>
        <div className="right-content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

