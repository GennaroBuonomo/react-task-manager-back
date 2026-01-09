import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="main-nav">
      <NavLink to="/" className="nav-link">
      Lista delle Task
      </NavLink>
      <NavLink to="/add" className="nav-link">
        Aggiungi la Task
      </NavLink>
    </nav>
  )
}

export default Navbar;