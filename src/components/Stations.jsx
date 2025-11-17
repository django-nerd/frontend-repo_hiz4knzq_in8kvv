import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, PlugZap } from 'lucide-react'

export default function Stations() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [stations, setStations] = useState([])
  const [city, setCity] = useState('')

  const load = async () => {
    const url = new URL(`${baseUrl}/api/stations`)
    if (city) url.searchParams.set('city', city)
    const res = await fetch(url)
    const data = await res.json()
    setStations(data)
  }

  useEffect(() => { load() }, [])

  return (
    <section id="stations" className="max-w-6xl mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold"
      >
        Charging Stations
      </motion.h2>
      <div className="mt-4 flex gap-2">
        <input value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Filter by city" className="border rounded px-3 py-2 bg-white/80 backdrop-blur" />
        <button onClick={load} className="px-4 py-2 bg-blue-600 text-white rounded shadow">Search</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {stations.map(s => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="p-4 bg-white/80 backdrop-blur border rounded-xl shadow-sm"
          >
            <p className="font-semibold flex items-center gap-2"><PlugZap className="h-4 w-4 text-blue-600" /> {s.name}</p>
            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1"><Building2 className="h-4 w-4" /> {s.operator} · {s.power_kw} kW · ${s.price_per_kwh}/kWh</p>
            <p className="text-sm text-gray-600">Ports available: {s.available_ports}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
