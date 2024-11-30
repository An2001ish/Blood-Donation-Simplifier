import { Routes, Route} from "react-router-dom"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import MainHeader from "./components/MainHeader"

function App() {
  

  return (
    <>
    <MainHeader/>
      <Routes>
        <Route path = "/" element = {<Homepage/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/register" element = {<Register/>}/>

      </Routes>
        
    </>
  )
}

export default App
