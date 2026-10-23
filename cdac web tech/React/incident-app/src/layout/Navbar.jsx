import { Link } from "react-router-dom"
import "./Navbar.css"

export function Navbar()
{

    // const menuStyle= {
    //             backgroundColor:"red",
    //             color:"white",
    //             border:"1px solid yellow",
    //             margin:"0 10px",
    //             padding:"10px 15px",
    //             borderRadius:"10px"
    //         }
// <></>  fragments  


return(<> 
        {/* <Link to="/" className="menu-item">Home</Link>
        <Link to="/about" className="menu-item">About</Link>
        <Link to="/contact" className="menu-item">Contact</Link>
        <Link to="/login" className="menu-item">Login</Link>
        <Link to="/register" className="menu-item">Register</Link>
        <Link to="/add" className="menu-item">Add Incident</Link> */}
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <Link class="navbar-brand" to="/">Home</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
   
          <Link class="nav-link active" aria-current="page" to="/about">About</Link>
        
   
          <Link class="nav-link" to="/contact">Contact</Link>
        
 
          <Link class="nav-link" to="/add">Add Incident</Link>
        
       
          <Link class="nav-link" to="/login">Login</Link>
        
       
    
          <Link class="nav-link" to="/register">Register</Link>

          <Link class="nav-link" to="/calculator">Calculator</Link>
        
       
      </ul>
    </div>
  </div>
</nav>
    </>)
}