import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../../services/API"
import MainHeader from "./MainHeader.jsx"
import "../../styles/Layout.css"
import PropTypes from "prop-types"

const Layout = ({ children }) => {
  const [userRole, setUserRole] = useState("")

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await api.get("/auth/current-user")
        console.log("role is: " + JSON.stringify(response.data.user.role))
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
          <nav>
            <ul>
              {userRole === "admin" && (
                <>
                  <li>
                    <Link to="/user-records">User Records</Link>
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
                </>
              )}
            </ul>
          </nav>
        </div>
        <div className="right-content">{children}</div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

