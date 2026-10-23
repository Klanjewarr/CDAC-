import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from "./App.jsx"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {Login} from "./pages/Login.jsx"

import { Contact } from './pages/Contact.jsx'
import {Register} from "./pages/Register.jsx"
import { Navbar } from './layout/Navbar.jsx'
import { About } from './pages/About.jsx'
import {AddIncident} from "./pages/AddIncident.jsx"
import { IncidentsList } from './pages/IncidentsList.jsx'
import { IncidentDetails } from './pages/IncidentDetails.jsx'
import { Calculator } from './pages/calculator.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar/>
      <Routes>
          <Route path='/' element={<App/>}/>

          <Route path="/about" element={<About/>}/>

          <Route path="/contact" element={<Contact/>}/>
          
          <Route path="/login" element={<Login/>}/>

          <Route path="/register" element={<Register/>}/>

          <Route path="/add" element={<AddIncident/>}/>

          <Route path="/list" element={<IncidentsList/>}/>

          <Route path="/details" element={<IncidentDetails/>}/>
          <Route path="/calculator" element={<Calculator/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
