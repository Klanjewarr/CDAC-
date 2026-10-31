import { Link } from "react-router-dom";

export  function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <Link className="navbar-brand" to="/">My App</Link>


    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <div className="navbar-nav ms-auto">
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/contact">Contact</Link>
      <Link className="nav-link" to="/login">Login</Link>
      <Link className="nav-link" to="/register">Register</Link>
       </div>   
    </div>
  </div>
</nav>
    </div>
  )
}
