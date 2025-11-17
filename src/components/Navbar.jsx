import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const navItem = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50'}`

  return (
    <nav className="bg-white/70 backdrop-blur sticky top-0 z-40 border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-block w-2 h-6 bg-blue-600 rounded" />
            <span className="font-bold text-lg">Ampora</span>
          </Link>
          <div className="flex items-center gap-2">
            <NavLink to="/plan" className={navItem}>Trip Planner</NavLink>
            <NavLink to="/stations" className={navItem}>Stations</NavLink>
            <NavLink to="/plans" className={navItem}>Plans</NavLink>
            <NavLink to="/dashboard" className={navItem}>User</NavLink>
            <NavLink to="/operator" className={navItem}>Operator</NavLink>
            <NavLink to="/admin" className={navItem}>Admin</NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}
