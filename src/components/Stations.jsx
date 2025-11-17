import { useEffect, useState } from 'react'

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
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold">Charging Stations</h2>
      <div className="mt-4 flex gap-2">
        <input value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Filter by city" className="border rounded px-3 py-2" />
        <button onClick={load} className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {stations.map(s => (
          <div key={s.id} className="p-4 bg-white border rounded">
            <p className="font-semibold">{s.name}</p>
            <p className="text-sm text-gray-600">{s.operator} · {s.power_kw} kW · ${s.price_per_kwh}/kWh</p>
            <p className="text-sm text-gray-600">Ports available: {s.available_ports}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
