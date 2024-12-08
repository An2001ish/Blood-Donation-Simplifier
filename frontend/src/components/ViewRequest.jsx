import { useState, useEffect } from 'react';
import api from '../services/API';
import Layout from './Layout/Layout';
import { createBloomFilter, filterRequests } from '../utils/BloomFilter';
import "../styles/ViewRequest.css";

const ViewRequest = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/bloodrequest/get-bloodrequest');
      setRequests(response.data.bloodrequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setError('Failed to fetch requests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (bloodGroup && requests.length > 0) {
      const bloomFilter = createBloomFilter(requests, bloodGroup);
      setFilteredRequests(filterRequests(requests, bloomFilter));
    } else {
      setFilteredRequests([]);
    }
    setIsSearched(true);
  };

  const handleAccept = async (requestId) => {
    try {
      await api.put(`/bloodrequest/update-status/${requestId}`, { status: 'Accepted' });
      fetchRequests(); // Refresh the list after accepting
      handleSearch(); // Re-filter the results
    } catch (error) {
      console.error('Error accepting request:', error);
      setError('Failed to accept request');
    }
  };

  if (isLoading) return <Layout><p className="loading">Loading...</p></Layout>;
  if (error) return <Layout><p className="error-message">{error}</p></Layout>;

  return (
    <Layout>
      <div className="view-requests">
        <h1 className="page-title">View Blood Requests</h1>
        <div className="search-container">
          <select 
            className="form-select"
            value={bloodGroup} 
            onChange={(e) => setBloodGroup(e.target.value)}
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
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>

        {isSearched && (
          filteredRequests.length === 0 ? (
            <p className="no-requests">No blood requests found for the selected blood group.</p>
          ) : (
            <div className="table-container">
              <table className="requests-table">
                <thead>
                  <tr>
                    <th>Blood Type</th>
                    <th>Quantity (ml)</th>
                    <th>Requester</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map(request => (
                    <tr key={request._id}>
                      <td>{request.bloodGroup}</td>
                      <td>{request.quantity}</td>
                      <td>{request.recId}</td>
                      <td>
                        <button 
                          className="accept-btn"
                          onClick={() => handleAccept(request._id)}
                        >
                          Accept
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </Layout>
  );
};

export default ViewRequest;

