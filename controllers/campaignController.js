const Campaign = require("../models/campaignModel")

// Create a new campaign
const createCampaign = async (req, res) => {
  try {
    const { name, startDate, endDate, location } = req.body
    const newCampaign = new Campaign({
      name,
      startDate,
      endDate,
      location,
      organization: req.user._id,
    })
    await newCampaign.save()
    res.status(201).json({ message: "Campaign created successfully", campaign: newCampaign })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error creating campaign" })
  }
}

// Get all campaigns
const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ endDate: { $gte: new Date() } }).populate(
      "organization",
      "organizationName",
    )
    res.status(200).json(campaigns)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error fetching campaigns" })
  }
}

module.exports = { createCampaign, getCampaigns }

