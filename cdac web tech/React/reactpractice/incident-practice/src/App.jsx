import {Routes,Route} from "react-router-dom"
import NavBar from "./NavBar/NavBar"
import { Home } from "./pages/Home"


function App() {
// for creating link of the components
  return (
   <>
   <NavBar/>
   <Routes>
     <Route path='/' element={<Home/>}/>
   </Routes>
   
   </>
  )
}

export default App
