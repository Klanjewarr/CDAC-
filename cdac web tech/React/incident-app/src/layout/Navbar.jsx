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

        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Home</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="nav-link active" aria-current="page" to="/about">About</Link>
        <Link className="nav-link" to="/contact">Contact</Link>
        <Link className="nav-link" to="/add">Add Incident</Link>
        <Link className="nav-link" to="/calculator">Calculator</Link>
        <Link className="nav-link" to="/user-forms">Login/Register</Link>
        <Link className="nav-link" to="/reducer-calc">Calculator Reducer</Link>
      </div>
    </div>
  </div>
</nav>
    </>)
}