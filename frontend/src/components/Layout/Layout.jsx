import { useState, useEffect, Fragment } from "react"
import { Link } from "react-router-dom"
import api from "../../services/API"
import MainHeader from "./MainHeader.jsx"
import "../../styles/Layout.css"
import PropTypes from "prop-types"

const Navigation = ({ userRole }) => (
  <nav>
    <ul>
      {userRole === "admin" && (
        <Fragment>
          <li>
            <Link to="/user-records">User Records</Link>
          </li>
        </Fragment>
      )}
      {userRole === "donor" && (
        <Fragment>
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
        </Fragment>
      )}
      {(userRole === "hospital" || userRole === "organization") && (
        <Fragment>
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
        </Fragment>
      )}
    </ul>
  </nav>
)

Navigation.propTypes = {
  userRole: PropTypes.string.isRequired,
}

const Layout = ({ children }) => {
  const [userRole, setUserRole] = useState("")

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await api.get("/auth/current-user")
        setUserRole(response.data.user.role)
      } catch (error) {
        console.error("Error fetching user role:", error)
      }
    }
    fetchUserRole()
  }, [])

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
          <Fragment>{children}</Fragment>
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
