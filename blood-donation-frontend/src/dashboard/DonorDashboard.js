import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Chat from '../components/chat/Chat';
import '../styles/DonorDashboard.css';

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showDonations, setShowDonations] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const history = useHistory();

  const fetchDonations = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/inventory', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setDonations(response.data.inventory.filter(item => item.inventoryType === 'in'));
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  }, []);

  const fetchRequests = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/inventory/requests', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRequests(response.data.requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  }, []);

  useEffect(() => {
    fetchDonations();
    fetchRequests();
  }, [fetchDonations, fetchRequests]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/');
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await axios.post(
        `http://localhost:4000/api/v1/inventory/accept-request/${requestId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      alert('Request accepted successfully');
      const updatedRequests = requests.filter(request => request._id !== requestId);
      setRequests(updatedRequests);
      const acceptedRequest = requests.find(request => request._id === requestId);
      setSelectedRequest(acceptedRequest);
    } catch (error) {
      console.error('Error accepting request:', error);
      alert('Failed to accept request');
    }
  };

  const closeChat = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="donor-dashboard">
      <h1>Donor Dashboard</h1>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <div className="dashboard-nav">
        <button
          onClick={() => setShowDonations(true)}
          className={showDonations ? 'active' : ''}
        >
          View Donations
        </button>
        <button
          onClick={() => setShowDonations(false)}
          className={!showDonations ? 'active' : ''}
        >
          Search Requests
        </button>
      </div>
      {showDonations ? (
        <div className="donations-list">
          <h2>Your Donations</h2>
          <ul>
            {donations.map(donation => (
              <li key={donation._id}>
                Blood Group: {donation.bloodGroup}, Quantity: {donation.quantity}, Date:{' '}
                {new Date(donation.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="requests-list">
          <h2>Blood Donation Requests</h2>
          <ul>
            {requests.map(request => (
              <li key={request._id}>
                Blood Group: {request.bloodGroup}, Quantity: {request.quantity}, Hospital:{' '}
                {request.hospital.name}
                <button onClick={() => handleAcceptRequest(request._id)} className="accept-btn">
                  Accept
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedRequest && (
        <div>
          <Chat
            requestId={selectedRequest._id}
            recipientId={selectedRequest.hospital._id}
            recipientName={selectedRequest.hospital.name}
          />
          <button onClick={closeChat} className="close-chat-btn">Close Chat</button>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;

