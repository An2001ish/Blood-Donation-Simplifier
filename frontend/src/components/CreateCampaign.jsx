import { useState } from "react";
import Layout from "./Layout/Layout";
import api from "../services/API";
import "../styles/CreateCampaign.css";

const CreateCampaign = () => {
  const [campaignData, setCampaignData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    location: { lat: 27.7172, lng: 85.3240 }, // Default to Kathmandu coordinates
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "lat" || name === "lng") {
      setCampaignData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: parseFloat(value) || ""
        }
      }));
    } else {
      setCampaignData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
            <div className="location-inputs">
              <div>
                <label htmlFor="lat">Latitude (°N)</label>
                <input
                  id="lat"
                  type="number"
                  name="lat"
                  step="any"
                  value={campaignData.location.lat}
                  onChange={handleInputChange}
                  placeholder="e.g., 27.7172"
                  required
                />
              </div>
              <div>
                <label htmlFor="lng">Longitude (°E)</label>
                <input
                  id="lng"
                  type="number"
                  name="lng"
                  step="any"
                  value={campaignData.location.lng}
                  onChange={handleInputChange}
                  placeholder="e.g., 85.3240"
                  required
                />
              </div>
            </div>
          </div>
          <button type="submit" className="submit-btn">Create Campaign</button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCampaign;