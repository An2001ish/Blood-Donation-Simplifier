import { useState, useEffect } from 'react';
import api from '../services/API';
import Layout from './Layout/Layout';
import ChatWindow from './ChatWindow';
import "../styles/AcceptedRequest.css";

const AcceptedRequests = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    fetchAcceptedRequests();
  }, []);

  const fetchAcceptedRequests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userResponse = await api.get('/auth/current-user');
      const email = userResponse.data.user.email;
      const role = userResponse.data.user.role;
      setUserRole(role);
      
      if(role === "donor"){
        const response = await api.get(`/bloodrequest/get-bloodrequest?status=Accepted&acceptId=${email}`);
        setAcceptedRequests(response.data.bloodrequests);
      } else {
        const response = await api.get(`/bloodrequest/get-bloodrequest?status=Accepted&recId=${email}`);
        setAcceptedRequests(response.data.bloodrequests);
      }
    } catch (error) {
      console.error('Error fetching accepted requests:', error);
      setError('Failed to fetch accepted requests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatClick = (request) => {
    setCurrentChat(request);
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
    setCurrentChat(null);
  };

  if (isLoading) return <Layout><p className="loading">Loading...</p></Layout>;
  if (error) return <Layout><p className="error-message">{error}</p></Layout>;

  return (
    <Layout>
      <div className="accepted-requests">
        <h1 className="page-title">Accepted Blood Requests</h1>
        {acceptedRequests.length === 0 ? (
          <p className="no-requests">No accepted blood requests found.</p>
        ) : (
          <div className="table-container">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Blood Type</th>
                  <th>Quantity (ml)</th>
                  <th>Requester</th>
                  <th>Status</th>
                  <th>Accepted By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {acceptedRequests.map(request => (
                  <tr key={request._id}>
                    <td>{request.bloodGroup}</td>
                    <td>{request.quantity}</td>
                    <td>{request.recId}</td>
                    <td>{request.status}</td>
                    <td>{request.acceptId}</td>
                    <td>
                      <button className="chat-button" onClick={() => handleChatClick(request)}>Chat</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {chatOpen && currentChat && (
          <ChatWindow
            request={currentChat}
            userRole={userRole}
            onClose={handleCloseChat}
          />
        )}
      </div>
    </Layout>
  );
};

export default AcceptedRequests;

