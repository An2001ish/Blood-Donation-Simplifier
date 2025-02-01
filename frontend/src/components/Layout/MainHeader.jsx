import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "../../styles/MainHeader.css";
import { useEffect, useState } from "react";
import api from '../../services/API';
import { showToast } from "../../utils/toast";

const MainHeader = () => {

  const [name, setName]= useState("")

const navigate = useNavigate()

useEffect(() => {
  fetchData();
}, []);

const fetchData = async () =>{
  const userResponse = await api.get('/auth/current-user');
      setName(userResponse.data.user.name)
}

const handleLogout=()=>{
  localStorage.clear();
  showToast.success("Logged Out Successfully!");
  navigate("/login");

}

  return (
    <div className="app-name">
      <div className="app-name2">
        <img src={logo} alt="" />
        <h1>Blood Donation Simplifier</h1>
      </div>
      <div className="left-side">
      <span>Logged in as: {name}</span>
      <button className="btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default MainHeader;
