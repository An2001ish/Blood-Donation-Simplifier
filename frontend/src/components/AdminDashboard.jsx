// import React, { useState } from 'react';
// import Layout from "./Layout/Layout";
// import UserManagement from './AdminDashboard/UserManagement';

// import DonationStatistics from './AdminDashboard/DonationStatistics';
// import "../styles/AdminDashboard.css";

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('users');

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'users':
//         return <UserManagement />;
//       case 'statistics':
//         return <DonationStatistics />;
//       default:
//         return <UserManagement />;
//     }
//   };

//   return (
//     <Layout>
//       <div className="admin-dashboard-content">
//         <h1 className="page-title">Admin Dashboard</h1>
//         <div className="admin-tabs">
//           <button 
//             className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
//             onClick={() => setActiveTab('users')}
//           >
//             User Management
//           </button>
          
//           <button 
//             className={`tab-button ${activeTab === 'statistics' ? 'active' : ''}`}
//             onClick={() => setActiveTab('statistics')}
//           >
//             Donation Statistics
//           </button>
//         </div>
//         <div className="tab-content">
//           {renderContent()}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AdminDashboard;
