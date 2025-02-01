import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/Popup.css';
import "../../styles/AdminDashboard.css";


const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Confirm Delete</h2>
        <div className="confirmation-content">
          <p>Are you sure you want to delete the user <strong>{userName}</strong>?</p>
          <p className="warning-text">This action cannot be undone.</p>
        </div>
        <div className="button-group">
          <button 
            type="button" 
            className="delete-btn"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

export default DeleteConfirmationModal;
