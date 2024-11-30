import logo from "../assets/logo.png"
import "./MainHeader.css";

const header = () => {
  return (
    
      <div className='app-name'>
    <img src={logo} alt="" />
        <h1>Blood Donation Simplifier</h1>
    </div>
    
  )
}

export default header
