import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Chat from '../components/chat/Chat';
import '../styles/HospitalDashboard.css';

const HospitalDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [bloodGroup, setBloodGroup] = useState('');
  const [quantity, setQuantity] = useState('');
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetchDonations();
    fetchAcceptedRequests();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/inventory', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setDonations(response.data.inventory.filter(item => item.inventoryType === 'out'));
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const fetchAcceptedRequests = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/inventory/accepted-requests', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setAcceptedRequests(response.data.acceptedRequests);
    } catch (error) {
      console.error('Error fetching accepted requests:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/');
  };

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:4000/api/v1/inventory/create-request',
        { bloodGroup, quantity },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      alert('Blood donation request created successfully');
      setBloodGroup('');
      setQuantity('');
    } catch (error) {
      console.error('Error creating request:', error);
      alert('Failed to create blood donation request');
    }
  };

  return (
    <div className="hospital-dashboard">
      <h1>Hospital Dashboard</h1>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <div className="create-request">
        <h2>Create Blood Donation Request</h2>
        <form onSubmit={handleCreateRequest}>
          <div className="form-group">
            <label htmlFor="bloodGroup">Blood Group</label>
            <select
              id="bloodGroup"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity (in units)</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Create Request</button>
        </form>
      </div>
      <div className="donations-received">
        <h2>Blood Donations Received</h2>
        <ul>
          {donations.map(donation => (
            <li key={donation._id}>
              Blood Group: {donation.bloodGroup}, Quantity: {donation.quantity}, Date:{' '}
              {new Date(donation.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
      <div className="accepted-requests">
        <h2>Accepted Requests</h2>
        <ul>
          {acceptedRequests.map(request => (
            <li key={request._id}>
              Blood Group: {request.bloodGroup}, Quantity: {request.quantity}, Donor: {request.donor.name}
              <button onClick={() => setSelectedRequest(request)} className="chat-btn">
                Chat with Donor
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedRequest && (
        <Chat
          requestId={selectedRequest._id}
          recipientId={selectedRequest.donor._id}
          recipientName={selectedRequest.donor.name}
        />
      )}
    </div>
  );
};

export default HospitalDashboard;

