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
        <Link to="/" className="menu-item">Home</Link>
        <Link to="/about" className="menu-item">About</Link>
        <Link to="/contact" className="menu-item">Contact</Link>
        <Link to="/login" className="menu-item">Login</Link>
        <Link to="/register" className="menu-item">Register</Link>
        <Link to="/add" className="menu-item">Add Incident</Link>
    </>)
}