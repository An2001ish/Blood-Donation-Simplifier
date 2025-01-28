import { useState, useEffect } from "react"
import Layout from "../components/Layout/Layout"
import api from "../services/API"
import "../styles/Analytics.css"

const Analytics = () => {
  const [bloodData, setBloodData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const userResponse = await api.get("/auth/current-user")
      const email = userResponse.data.user.email
      setUserEmail(email)

      const inventoryResponse = await api.get(`/inventory/get-inventory?email=${encodeURIComponent(email)}`)
      const inventoryData = inventoryResponse.data.inventory || []

      const bloodGroups = {}
      inventoryData.forEach((item) => {
        if (bloodGroups[item.bloodGroup]) {
          bloodGroups[item.bloodGroup] += item.quantity
        } else {
          bloodGroups[item.bloodGroup] = item.quantity
        }
      })

      setBloodData(bloodGroups)
    } catch (error) {
      console.error("Error fetching data:", error)
      setError("Failed to fetch data")
    } finally {
      setIsLoading(false)
    }
  }

  const maxValue = Math.max(...Object.values(bloodData), 1)

  if (isLoading)
    return (
      <Layout>
        <p className="loading">Loading...</p>
      </Layout>
    )
  if (error)
    return (
      <Layout>
        <p className="error-message">{error}</p>
      </Layout>
    )

  return (
    <Layout>
      <div className="analytics-content">
        <h1 className="page-title">Blood Record Analytics</h1>
        <div className="chart-container">
          <h2>Total Blood Collected by Blood Group (ml)</h2>
          {Object.keys(bloodData).length === 0 ? (
            <p className="no-records">No inventory records found.</p>
          ) : (
            <div className="radial-chart">
              {Object.entries(bloodData).map(([bloodGroup, amount], index) => (
                <div key={bloodGroup} className="radial-chart-item">
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path
                      className="circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle"
                      strokeDasharray={`${(amount / maxValue) * 100}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className="percentage">
                      {amount}
                    </text>
                  </svg>
                  <div className="radial-label">{bloodGroup}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="total-blood">
          <h3>Total Blood Collected</h3>
          <p>{Object.values(bloodData).reduce((a, b) => a + b, 0)} ml</p>
        </div>
      </div>
    </Layout>
  )
}

export default Analytics

