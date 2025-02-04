import { useState } from 'react';
import axios from "axios";
import '../styles/Auth.css';
import { useNavigate } from 'react-router-dom';
import { showToast } from "../utils/toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/v1/auth/login", {
        email,
        password,
        role,
      });

      if (response.data.success) {
        showToast.success('Login successful!');
        localStorage.setItem('token', response.data.token);
        if (role === "admin") {
          navigate('/user-records');
        } else {
          navigate("/");
        }
      } else {
        showToast.error(response.data.message || 'Invalid login credentials!');
      }
    } catch (error) {
      // Show the specific error message from the backend if available
      const errorMessage = error.response?.data?.message || 'Invalid login credentials!';
      showToast.error(errorMessage);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  };

  const handlePassword = (e) => {
    setPassword(e.target.value)
  };
  
  return (
    <div className="container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Login</h2>
          <p>Enter your details to login.</p>
        </div>
        <div className="auth-content">
          <form onSubmit={handleSubmit} className="auth-form">
            <input type="email" placeholder="Email" value={email} onChange={handleEmail} required className="auth-input" />
            <input type="password" placeholder="Password" value={password} onChange={handlePassword} required className="auth-input" />
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
              Login
            </button>
          </form>
        </div>
        <div className="auth-footer">
          <button onClick={handleRegister}>
            Need an account? Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
