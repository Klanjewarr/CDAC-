import { About } from "./pages/About";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {Login} from "./pages/LoginView.jsx"
import { Navbar } from './layout/Navbar.jsx'
import { Contact } from './pages/Contact.jsx'
import {Register} from "./pages/RegisterView.jsx"
import {AddIncident} from "./pages/AddIncident.jsx"
import { IncidentsList } from './pages/IncidentsList.jsx'
import { IncidentDetails } from './pages/IncidentDetails.jsx'
import { UserAuthForms } from './pages/UserAuthForms.jsx'
import {Calculator} from "./pages/Calculator.jsx"
import { Home } from "./pages/Home.jsx";
import { useState } from "react";
import { createContext } from "react";
import CalculatorReducer from "./pages/reducer/CalculatorReducer.jsx"; //named import
import { authStore } from "./pages/redux/AuthStore.jsx";
import { Provider } from "react-redux";



export const TitleContext=createContext()
export function App()
{
  const [title,setTitle]=useState("Home")
  return(<>
  <TitleContext.Provider value={{setTitle,title}}>
    <Provider store={authStore}>
    <BrowserRouter>
  <title>{title}</title>
    <Navbar/>
      <Routes>
          <Route path='/' element={<Home/>}/>

          <Route path="/about" element={<About />}/>

          <Route path="/contact" element={<Contact/>}/>
          
          <Route path="/login" element={<Login />}/>

          <Route path="/register" element={<Register />}/>

          <Route path="/add" element={<AddIncident />}/>

          <Route path="/list" element={<IncidentsList />}/>

          <Route path="/details" element={<IncidentDetails/>}/>

          <Route path="/user-forms" element={<UserAuthForms />}/>

          <Route path="/calculator" element={<Calculator/>}/>

          <Route path="/reducer-calc" element={<CalculatorReducer/>}/>
      </Routes>
    </BrowserRouter>
    </Provider>
  </TitleContext.Provider>
  </>)
}