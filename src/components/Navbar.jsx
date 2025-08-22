import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="navbar">
      <h1><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Events</Link></h1>
      <nav className="navlinks">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/rsvp">RSVP</NavLink>
        <NavLink to="/create">Create Event</NavLink>
      </nav>
    </header>
  )
}
