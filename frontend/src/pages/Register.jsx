import { useState } from 'react';
import './Auth.css';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState('donor');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(name,email,password,address,contact,role)
    } catch (error) {
      console.log(error);
    }
  };
  const handleName=(e)=>{
    setName(e.target.value)
  };
  const handleEmail=(e)=>{
    setEmail(e.target.value)
  };
  const handlePassword=(e)=>{
    setPassword(e.target.value)
  };
  const handleAddress=(e)=>{
    setAddress(e.target.value)
  };
  const handleContact=(e)=>{
    setContact(e.target.value)
  };

  return (
    <div className="container">
    
    <div className="auth-card">
      <div className="auth-header">
        <h2>Register</h2>
        <p>Enter your details to create an account</p>
      </div>
      <div className="auth-content">
        <form onSubmit={handleSubmit} className="auth-form">
          <input type="text" placeholder="Name" value = {name} onChange={handleName} required className="auth-input" />
          <input type="email" placeholder="Email" value = {email} onChange={handleEmail} required className="auth-input" />
          <input type="password" placeholder="Password" value = {password} onChange={handlePassword}  required className="auth-input" />
          <input type="text" placeholder="Address" value = {address} onChange={handleAddress} required className="auth-input" />
          <input type="text" placeholder="Contact" value = {contact} onChange={handleContact} required className="auth-input" />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="auth-select"
              placeholder="Select role"
            >
              <option value="admin">Admin</option>
              <option value="donor">Donor</option>
              <option value="hospital">Hospital</option>
              <option value="organization">Organization</option>
            </select>
        
          
          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
      </div>
      <div className="auth-footer">
        <button>
          Already have an account? Login
        </button>
      </div>
    </div>
    </div>
  );
};

export default Register;
