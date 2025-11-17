import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Planner from './components/Planner'
import Stations from './components/Stations'
import Plans from './components/Plans'
import Dashboards from './components/Dashboards'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white text-gray-900">
      <Navbar />
      <Hero />
      <Planner />
      <Stations />
      <Plans />
      <Dashboards />
      <footer className="text-center text-sm text-gray-500 py-10">© {new Date().getFullYear()} Ampora</footer>
    </div>
  )
}

export default App
