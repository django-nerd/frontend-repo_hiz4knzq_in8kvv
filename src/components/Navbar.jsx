import { useCallback } from 'react'
import { Menu, Car, Map, Fuel, CreditCard, User } from 'lucide-react'

export default function Navbar() {
  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const Item = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => scrollTo(id)}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700/90 hover:text-blue-700 hover:bg-white/60 transition"
    >
      <Icon className="h-4 w-4" /> {label}
    </button>
  )

  return {
    /* Top nav with glass + subtle border */
  } && (
    <nav className="sticky top-0 z-40 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-white/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => scrollTo('top')} className="flex items-center gap-2 group">
            <span className="relative inline-flex h-7 w-7 items-center justify-center">
              <span className="absolute inset-0 rounded-lg bg-gradient-to-tr from-blue-600 to-emerald-500 opacity-80 blur-[6px] group-hover:blur-[10px] transition" />
              <span className="relative rounded-lg bg-white text-blue-700 font-black tracking-tight px-2 py-1 text-sm shadow-sm">A</span>
            </span>
            <span className="font-bold text-lg tracking-tight">Ampora</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            <Item id="plan" icon={Map} label="Trip Planner" />
            <Item id="stations" icon={Fuel} label="Stations" />
            <Item id="plans" icon={CreditCard} label="Plans" />
            <Item id="dashboards-user" icon={User} label="User" />
            <Item id="dashboards-operator" icon={Car} label="Operator" />
            <Item id="dashboards-admin" icon={Menu} label="Admin" />
          </div>

          <div className="md:hidden">
            <button className="p-2 rounded-md hover:bg-white/70" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
