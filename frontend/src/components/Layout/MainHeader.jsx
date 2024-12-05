import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./MainHeader.css";

const MainHeader = () => {

  const navigate = useNavigate()

const handleLogout=()=>{
  localStorage.clear();
  navigate("/login");

}

  return (
    <div className="app-name">
      <div className="app-name2">
        <img src={logo} alt="" />
        <h1>Blood Donation Simplifier</h1>
      </div>
      <button className="btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default MainHeader;
