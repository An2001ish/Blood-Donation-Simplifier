import { useState } from 'react';
import './Auth.css';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('donor');
  // const formType= "login";

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(email,password,role)
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmail=(e)=>{
    setEmail(e.target.value)
  };
  const handlePassword=(e)=>{
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
          <input type="email" placeholder="Email" value = {email} onChange={handleEmail}required className="auth-input" />
          <input type="password" placeholder="Password" value = {password} onChange={handlePassword} required className="auth-input" />
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
        <button>
          Need an account? Register
        </button>
      </div>
    </div>
    </div>
  );
};

export default Login;
