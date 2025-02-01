import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../../services/API";
import MainHeader from "./MainHeader.jsx";
import "../../styles/Layout.css";
import PropTypes from "prop-types";

const Navigation = ({ userRole }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav>
      <ul>
        {userRole === "admin" && (
          <>
          <li>
            <Link to="/user-records" className={isActive('/user-records') ? 'active' : ''}>
              User Records
            </Link>  
          </li>
          <li>
            <Link to="/donation-statistics" className={isActive('/donation-statistics') ? 'active' : ''}>
              Donation Statistics
            </Link>
          </li>
          </>
        )}
        {userRole === "donor" && (
          <>
            <li>
              <Link to="/donation-records">Donation Records</Link>
            </li>
            <li>
              <Link to="/view-requests">View Requests</Link>
            </li>
            <li>
              <Link to="/accepted-requests">Accepted Requests</Link>
            </li>
            <li>
              <Link to="/view-campaigns">View Campaigns</Link>
            </li>
          </>
        )}
        {(userRole === "hospital" || userRole === "organization") && (
          <>
            <li>
              <Link to="/donation-records">Donation Records</Link>
            </li>
            <li>
              <Link to="/analytics">Analytics</Link>
            </li>
            <li>
              <Link to="/create-bloodrequest">Send Requests</Link>
            </li>
            <li>
              <Link to="/accepted-requests">Accepted Requests</Link>
            </li>
            {userRole === "organization" && (
              <li>
                <Link to="/create-campaign">Create Campaign</Link>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  userRole: PropTypes.string.isRequired,
};

const Layout = ({ children }) => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await api.get("/auth/current-user");
        setUserRole(response.data.user.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
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
          <Navigation userRole={userRole} />
        </div>
        <div className="right-content">
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;