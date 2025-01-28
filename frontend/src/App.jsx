import { Routes, Route} from "react-router-dom"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import SendRequests from "./components/SendRequest"
import ViewRequest from "./components/ViewRequest"
import AcceptedRequests from "./components/AcceptedRequest"
import AdminDashboard from "./components/AdminDashboard"
import Analytics from "./components/Analytics"


function App() {
  

  return (
    <>
      <Routes>
        <Route path = "/" element = {<Homepage/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path="/create-bloodrequest" element = {<SendRequests/>} />
        <Route path="/view-requests" element = {<ViewRequest/>} />
        <Route path="/donation-records" element = {<Homepage/>} />
        <Route path="/accepted-requests" element = {<AcceptedRequests/>} />
        <Route path="/user-records" element = {<AdminDashboard/>} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
        
    </>
  )
}

export default App
