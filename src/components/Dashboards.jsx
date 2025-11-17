import { useEffect, useState } from 'react'

export default function Dashboards() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [bookings, setBookings] = useState([])
  const [stations, setStations] = useState([])
  const [plans, setPlans] = useState([])
  const [email, setEmail] = useState('jane@example.com')

  const load = async () => {
    const [b, s, p] = await Promise.all([
      fetch(`${baseUrl}/api/bookings?user_email=${encodeURIComponent(email)}`).then(r=>r.json()),
      fetch(`${baseUrl}/api/stations`).then(r=>r.json()),
      fetch(`${baseUrl}/api/plans`).then(r=>r.json()),
    ])
    setBookings(b)
    setStations(s)
    setPlans(p)
  }

  useEffect(() => { load() }, [])

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center gap-2">
        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="border rounded px-3 py-2" />
        <button onClick={load} className="px-4 py-2 bg-blue-600 text-white rounded">Refresh</button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-4 border rounded">
          <h3 className="font-semibold mb-3">User Dashboard</h3>
          <ul className="space-y-2">
            {bookings.map(b => (
              <li key={b.id} className="p-2 border rounded text-sm">
                <p><b>Booking:</b> {new Date(b.start_time).toLocaleString()}</p>
                <p className="text-gray-600">{b.status} · {b.duration_minutes} min</p>
              </li>
            ))}
            {!bookings.length && <p className="text-gray-500">No bookings yet</p>}
          </ul>
        </div>

        <div className="bg-white p-4 border rounded">
          <h3 className="font-semibold mb-3">Operator Dashboard</h3>
          <p className="text-sm text-gray-600">Active stations: {stations.length}</p>
          <ul className="mt-2 space-y-1 text-sm">
            {stations.slice(0,5).map(s => (
              <li key={s.id}>• {s.name} · Ports: {s.available_ports}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 border rounded">
          <h3 className="font-semibold mb-3">Admin Panel</h3>
          <p className="text-sm text-gray-600">Plans available: {plans.length}</p>
          <ul className="mt-2 space-y-1 text-sm">
            {plans.map(p => (
              <li key={p.id}>• {p.name} · ${p.monthly_fee_usd}/mo</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
