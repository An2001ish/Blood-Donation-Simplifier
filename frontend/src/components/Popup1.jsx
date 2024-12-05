// import { useState } from 'react';
// import '../styles/Popup.css';
// import axios from 'axios';

// const PopUp = ({ isOpen, onClose, onSubmit }) => {
//   const [date, setDate] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [organization, setOrganization] = useState('');
//   const [bloodGroup, setBloodGroup] = useState('');

//   const handleSubmit = async (e) => {
//     try {
//       e.preventDefault();
//       {
//         const {response} = await axios.post("http://localhost:4000/api/v1/inventory/create-inventory", {
//           date,
//           bloodGroup,
//           quantity,
//           organization
//         });
//         console.log(response.data);
//         // Handle successful registration (e.g., show a success message, redirect to login)
//       }
//     } catch (error) {
//       console.log(error)
//     }
    
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="popup-overlay">
//       <div className="popup">
//         <h2>Add Donation Record</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="date">Date:</label>
//             <input
//               type="date"
//               id="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="bloodGroup">Blood Type:</label>
//             <input
//               type="text"
//               id="bloodGroup"
//               value={bloodGroup}
//               onChange={(e) => setBloodGroup(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="quantity">Quantity (ml):</label>
//             <input
//               type="number"
//               id="quantity"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="organization">Organization/Hospital:</label>
//             <input
//               type="text"
//               id="organization"
//               value={organization}
//               onChange={(e) => setOrganization(e.target.value)}
//               required
//             />
//           </div>
//           <div className="button-group">
//             <button type="submit" onClick={handleSubmit}>Submit</button>
//             <button type="button" onClick={onClose}>Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PopUp;

