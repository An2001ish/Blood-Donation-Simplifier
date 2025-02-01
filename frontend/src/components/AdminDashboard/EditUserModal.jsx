import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/Popup.css';
import "../../styles/AdminDashboard.css";


const EditUserModal = ({ isOpen, user, onClose, onSave }) => {
  const [userData, setUserData] = useState({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    bloodGroup: user.bloodGroup || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(userData);
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              value={userData.role}
              onChange={(e) => setUserData({ ...userData, role: e.target.value })}
              required
            >
              <option value="donor">Donor</option>
              <option value="hospital">Hospital</option>
              <option value="organization">Organization</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="button-group">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    bloodGroup: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditUserModal;
