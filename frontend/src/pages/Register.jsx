import { useState } from 'react';
import '../styles/Auth.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState('donor');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/v1/auth/register", {
        name,
        email,
        password,
        address,
        phone: contact,
        role,
      });
      
      if (response.data.success) {
        alert('Registration successful!');
        navigate("/login");
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      alert('Registration failed. Please try again.');
    }
  };

  const handleLogin = () => {
    navigate("/login");
  }

  const handleName = (e) => {
    setName(e.target.value)
  };
  const handleEmail = (e) => {
    setEmail(e.target.value)
  };
  const handlePassword = (e) => {
    setPassword(e.target.value)
  };
  const handleAddress = (e) => {
    setAddress(e.target.value)
  };
  const handleContact = (e) => {
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
            <input type="text" placeholder="Name" value={name} onChange={handleName} required className="auth-input" />
            <input type="email" placeholder="Email" value={email} onChange={handleEmail} required className="auth-input" />
            <input type="password" placeholder="Password" value={password} onChange={handlePassword} required className="auth-input" />
            <input type="text" placeholder="Address" value={address} onChange={handleAddress} required className="auth-input" />
            <input type="text" placeholder="Contact" value={contact} onChange={handleContact} required className="auth-input" />
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
          <button onClick={handleLogin}>
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

