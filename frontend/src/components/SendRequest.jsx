import { useState, useEffect } from 'react';
import api from '../services/API';
import Layout from './Layout/Layout';
import "../styles/SendRequest.css";

const SendRequests = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState("Pending");
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userResponse = await api.get('/auth/current-user');
      const email = userResponse.data.user.email;
      setUserEmail(email);
    
      // Fetch blood requests for the current user
      const requestsResponse = await api.get('/bloodrequest/get-bloodrequest', {
        params: { recId: email }
      });
      setRequests(requestsResponse.data.bloodrequests);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/bloodrequest/create-bloodrequest', { bloodGroup, quantity, status, recId: userEmail });
      setBloodGroup('');
      setQuantity('');
      fetchData(); // Refresh the list after sending a new request
    } catch (error) {
      console.error('Error sending request:', error);
      setError('Failed to send request');
    }
  };

  if (isLoading) return <Layout><p className="loading">Loading...</p></Layout>;
  if (error) return <Layout><p className="error-message">{error}</p></Layout>;

  return (
    <Layout>
      <div className="send-requests">
        <h1 className="page-title">Send Blood Request</h1>
        <form onSubmit={handleSubmit} className="request-form">
          <select 
            className="form-select"
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
          <input
            className="form-input"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity (ml)"
            required
          />
          <button type="submit" className="submit-btn">Send Request</button>
        </form>

        <h2 className="page-title">Your Blood Requests</h2>
        {requests.length === 0 ? (
          <p className="no-requests">No blood requests found.</p>
        ) : (
          <div className="table-container">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Blood Type</th>
                  <th>Quantity (ml)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(request => (
                  <tr key={request._id}>
                    <td>{request.bloodGroup}</td>
                    <td>{request.quantity}</td>
                    <td>{request.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SendRequests;

