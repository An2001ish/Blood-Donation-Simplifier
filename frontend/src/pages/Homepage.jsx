import { useState, useEffect } from 'react';
import Layout from "../components/Layout/Layout";
import PopUp from "../components/Popup";
import api from '../services/API';
import "../styles/Homepage.css";

const Homepage = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [inventoryData, setInventoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

      const inventoryResponse = await api.get(`/inventory/get-inventory?email=${encodeURIComponent(email)}`);
      setInventoryData(inventoryResponse.data.inventory || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRecord = () => setIsPopUpOpen(true);
  const handleClosePopUp = () => {
    setIsPopUpOpen(false);
    fetchData();
  };

  if (isLoading) return <Layout><p className="loading">Loading...</p></Layout>;
  if (error) return <Layout><p className="error-message">{error}</p></Layout>;

  return (
    <Layout>
      <div className="homepage-content">
        <h1 className="page-title">Blood Donation Records</h1>
        <button className="add-record-btn" onClick={handleAddRecord}>Add Record</button>
        <PopUp isOpen={isPopUpOpen} onClose={handleClosePopUp} userEmail={userEmail} />
        {inventoryData.length === 0 ? (
          <p className="no-records">No inventory records found.</p>
        ) : (
          <div className="table-container">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Blood Group</th>
                  <th>Quantity (ml)</th>
                  <th>Organization</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item, index) => (
                  <tr key={index}>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td>{item.bloodGroup}</td>
                    <td>{item.quantity}</td>
                    <td>{item.organization}</td>
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

export default Homepage;

