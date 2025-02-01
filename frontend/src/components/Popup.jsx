import { useState, useEffect } from "react";
import api from "../services/API.js";
import "../styles/Popup.css";
import PropTypes from "prop-types";
import { showToast } from "../utils/toast";
import { validateName } from "../utils/validation";

const PopUp = ({ isOpen, onClose, userEmail, userRole, userbloodGroup }) => {
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [organization, setOrganization] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    // Set the maxDate to today's date in the format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];
    setMaxDate(today);
    console.log("Current userEmail and bloodGroup in popup:", userEmail, userbloodGroup);
  }, []);

  const handleNameChange = (value) => {
    setOrganization(value);
    // Clear error when user starts typing
    setNameError("");
  };

  const validateInput = () => {
    const nameValidation = validateName(organization);
    if (!nameValidation.isValid) {
      setNameError(nameValidation.message);
      showToast.error(nameValidation.message);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate name first
    if (!validateInput()) {
      return;
    }
    
    // Validate quantity
    const quantityNum = parseFloat(quantity);
    if (quantityNum > 350) {
      showToast.warning("Quantity surpasses safe blood donation amount (maximum 350 ml)");
      return;
    }

    try {
      const response = await api.post("/inventory/create-inventory", {
        email: userEmail,
        date,
        bloodGroup: userRole === "donor" ? userbloodGroup : bloodGroup,
        quantity: quantityNum,
        organization: organization.trim(), // Trim any extra spaces
      });
      console.log("Submitted data:", response.data);
      showToast.success("Donation record added successfully");
      onClose();
    } catch (error) {
      console.error("Error submitting data:", error);
      showToast.error("Failed to add donation record");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Add Donation Record</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              max={maxDate} // Set the max attribute to today's date
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bloodGroup">Blood Type:</label>
            {userRole === "donor" ? (
              // Display the user's blood group as a locked option
              <input
                type="text"
                id="bloodGroup"
                value={userbloodGroup}
                readOnly
                className="readonly-input"
              />
            ) : (
              // Keep the dropdown for other roles
              <select
                type="text"
                id="bloodGroup"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                required
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity (ml):</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 350)) {
                  setQuantity(value);
                }
              }}
              min="0"
              max="350"
              step="1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="organization">
              {userRole === "donor" ? "Organization/Hospital:" : "Donor Name:"}
            </label>
            <input
              type="text"
              id="organization"
              value={organization}
              onChange={(e) => handleNameChange(e.target.value)}
              onBlur={() => validateInput()}
              placeholder={userRole === "donor" ? "Enter organization name" : "Enter donor name"}
              required
              className={nameError ? "error" : ""}
            />
          </div>
          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

PopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  userbloodGroup: PropTypes.string.isRequired,
};

export default PopUp;
