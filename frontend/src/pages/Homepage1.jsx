// import { useState } from 'react';
// import Layout from "../components/Layout/Layout";
// import PopUp from "../components/Popup";
// import "../styles/Homepage.css";

// const Homepage = () => {
//   const [isPopUpOpen, setIsPopUpOpen] = useState(false);

//   const handleAddRecord = () => {
//     setIsPopUpOpen(true);
//   };

//   const handleClosePopUp = () => {
//     setIsPopUpOpen(false);
//   };

//   const handleSubmitRecord = (record) => {
//     // Here you would typically send the record to your backend or store it in state
//     console.log("New record:", record);
//     // For now, we'll just log it to the console
//   };

//   return (
//     <Layout>
//       <div className="homepage-content">
//         <h1>Blood Donation Records</h1>
//         <button className="add-record" onClick={handleAddRecord}>Add Record</button>
//         <PopUp 
//           isOpen={isPopUpOpen} 
//           onClose={handleClosePopUp} 
//           onSubmit={handleSubmitRecord}
//         />
//       </div>
//     </Layout>
//   );
// };

// export default Homepage;

