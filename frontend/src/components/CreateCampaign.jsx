import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import Layout from "./Layout/Layout";
import api from "../services/API";
import "../styles/CreateCampaign.css";
import "leaflet/dist/leaflet.css";

const CreateCampaign = () => {
  const [campaignData, setCampaignData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    location: { lat: 27.7172, lng: 85.3240 }, // Default to Kathmandu coordinates
  });

  const handleInputChange = (e) => {
    setCampaignData({ ...campaignData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (lat, lng) => {
    setCampaignData((prev) => ({
      ...prev,
      location: {
        lat: lat,
        lng: lng,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/campaigns", campaignData);
      alert("Campaign created successfully!");
      // Reset form
      setCampaignData({
        name: "",
        startDate: "",
        endDate: "",
        location: { lat: 27.7172, lng: 85.3240 },
      });
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Failed to create campaign");
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        handleLocationChange(e.latlng.lat, e.latlng.lng);
      },
    });

    return campaignData.location.lat && campaignData.location.lng ? (
      <Marker position={[campaignData.location.lat, campaignData.location.lng]} />
    ) : null;
  };

  return (
    <Layout>
      <div className="create-campaign">
        <h2>Create Blood Donation Campaign</h2>
        <form onSubmit={handleSubmit} className="campaign-form">
          <div className="form-group">
            <label htmlFor="name">Campaign Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={campaignData.name}
              onChange={handleInputChange}
              placeholder="Enter campaign name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              id="startDate"
              type="date"
              name="startDate"
              value={campaignData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              id="endDate"
              type="date"
              name="endDate"
              value={campaignData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <MapContainer
              center={[27.7172, 85.3240]}
              zoom={13}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker />
            </MapContainer>
            <small>Click on the map to select the location</small>
          </div>
          <button type="submit" className="submit-button">
            Create Campaign
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCampaign;