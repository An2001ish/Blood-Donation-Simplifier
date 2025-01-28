import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
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
        <div key={campaign._id}>
          <h3>{campaign.name}</h3>
          <p>Start Date: {new Date(campaign.startDate).toLocaleDateString()}</p>
          <p>End Date: {new Date(campaign.endDate).toLocaleDateString()}</p>
          <MapContainer
            center={[campaign.location.lat, campaign.location.lng]}
            zoom={13}
            style={{ height: "200px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[campaign.location.lat, campaign.location.lng]}>
              <Popup>{campaign.name}</Popup>
            </Marker>
          </MapContainer>
        </div>
      ))}
    </Layout>
  )
}

export default ViewCampaigns

