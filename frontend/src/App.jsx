import { Routes, Route} from "react-router-dom"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import SendRequests from "./components/SendRequest"
import ViewRequest from "./components/ViewRequest"

function App() {
  

  return (
    <>
      <Routes>
        <Route path = "/" element = {<Homepage/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path="/create-bloodrequest" element = {<SendRequests/>} />
        <Route path="/view-requests" element = {<ViewRequest/>} />

      </Routes>
        
    </>
  )
}

export default App
