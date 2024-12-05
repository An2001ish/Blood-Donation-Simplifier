import { useState, useEffect } from 'react';
import api from '../services/API.js';
import '../styles/Popup.css';
import PropTypes from 'prop-types';

const PopUp = ({ isOpen, onClose, userEmail }) => {
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [organization, setOrganization] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  useEffect(() => {
    console.log("Current userEmail in popup:", userEmail);
  }, [userEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/inventory/create-inventory", {
        email: userEmail,
        date,
        bloodGroup,
        quantity,
        organization
      });
      console.log("Submitted data:", response.data);
      onClose();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Add Donation Record</h2>
        <p>User Email: {userEmail}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bloodGroup">Blood Type:</label>
            <input
              type="text"
              id="bloodGroup"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity (ml):</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="organization">Organization/Hospital:</label>
            <input
              type="text"
              id="organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Cancel</button>
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
};

export default PopUp;

