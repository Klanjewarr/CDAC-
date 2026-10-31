import {BrowserRouter,Routes,Route} from "react-router-dom"
import {NavBar} from "./NavBar/NavBar"
import {Home} from "./pages/Home"
import { Contact } from "./pages/Contact"
import { Login } from "./pages/Login"
import Register from "./pages/Register"



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
   </Routes>
   </BrowserRouter>
   
   </>
  )
}

export default App
