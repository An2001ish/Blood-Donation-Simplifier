import { useState, useEffect } from "react"
import Layout from "./Layout/Layout"
import api from "../services/API"

const ViewCampaigns = () => {
  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await api.get("/campaigns")
        setCampaigns(response.data)
      } catch (error) {
        console.error("Error fetching campaigns:", error)
      }
    }
    fetchCampaigns()
  }, [])

  return (
    <Layout>
      <h2>Blood Donation Campaigns</h2>
      {campaigns.map((campaign) => (
        <div key={campaign._id} className="border p-4 mb-4 rounded shadow">
          <h3 className="text-lg font-semibold">{campaign.name}</h3>
          <p>Start Date: {new Date(campaign.startDate).toLocaleDateString()}</p>
          <p>End Date: {new Date(campaign.endDate).toLocaleDateString()}</p>
          <p>Location: {campaign.location.lat}° N, {campaign.location.lng}° E</p>
        </div>
      ))}
    </Layout>
  )
}

export default ViewCampaigns