import {BrowserRouter,Routes,Route} from "react-router-dom"
import {NavBar} from "./NavBar/NavBar"
import {Home} from "./pages/Home"
import { Contact } from "./pages/Contact"
import { Login } from "./pages/Login"
import Register from "./pages/Register"
import IncidentsList from "./pages/IncidentsList"



function App() {
// for creating link of the components
  return (
   <>
   <BrowserRouter>
   <NavBar/>
   <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/contact' element={<Contact/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/incident-list' element={<IncidentsList/>}/>

   </Routes>
   </BrowserRouter>
   
   </>
  )
}

export default App
