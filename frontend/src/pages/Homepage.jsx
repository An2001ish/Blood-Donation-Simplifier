import { useState, useEffect } from 'react';
import Layout from "../components/Layout/Layout";
import PopUp from "../components/Popup";
import api from '../services/API';
import "../styles/Homepage.css";

const Homepage = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await api.get('/auth/current-user');
        
        // Log the entire response object
        console.log("Response:", response);
        
        // Log specific properties of the response
        console.log("Response data:", response.data);
        console.log("User email:", response.data.user.email);
        
        setUserEmail(response.data.user.email);
        console.log("userEmail :", response.data.user.email);
    
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

    fetchUserEmail();
  }, []);

  const handleAddRecord = () => {
    setIsPopUpOpen(true);
  };

  const handleClosePopUp = () => {
    setIsPopUpOpen(false);
  };

  

  return (
    <Layout>
      <div className="homepage-content">
        <h1>Blood Donation Records</h1>
        <button className="add-record" onClick={handleAddRecord}>Add Record</button>
        <PopUp 
          isOpen={isPopUpOpen} 
          onClose={handleClosePopUp} 
          userEmail={userEmail}
        />
      </div>
    </Layout>
  );
};

export default Homepage;

