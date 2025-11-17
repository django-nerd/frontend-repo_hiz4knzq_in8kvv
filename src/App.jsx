import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Planner from './components/Planner'
import Stations from './components/Stations'
import Plans from './components/Plans'
import Dashboards from './components/Dashboards'

function App() {
  return (
    <div className="relative min-h-screen text-gray-900">
      {/* Ambient gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute top-40 -right-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.6)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.25]" />
      </div>

      <Navbar />
      <Hero />
      <Planner />
      <Stations />
      <Plans />
      <Dashboards />

      <footer className="text-center text-sm text-gray-600 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <p className="font-medium">© {new Date().getFullYear()} Ampora</p>
          <p className="mt-1 text-gray-500">Plan. Charge. Go further.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
