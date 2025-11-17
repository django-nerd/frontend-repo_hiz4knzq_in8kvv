import { useState } from 'react'

export default function Planner() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({
    origin_lat: 37.7749,
    origin_lng: -122.4194,
    dest_lat: 34.0522,
    dest_lng: -118.2437,
    vehicle_battery_kwh: 60,
    vehicle_efficiency_kwh_per_100km: 15,
    current_soc_percent: 80,
    target_arrival_soc_percent: 10,
  })
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: Number(value) }))
  }

  const submit = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/plan-trip`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setPlan(data)
    } catch (e) {
      alert('Failed to plan trip')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold">Trip Planner</h2>
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-4 rounded-lg border space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {Object.keys(form).map((key) => (
              <label key={key} className="text-sm text-gray-700">
                <span className="block mb-1 capitalize">{key.replaceAll('_', ' ')}</span>
                <input
                  type="number"
                  step="any"
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                />
              </label>
            ))}
          </div>
          <button onClick={submit} className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700" disabled={loading}>
            {loading ? 'Planning…' : 'Plan Trip'}
          </button>
        </div>

        <div className="md:col-span-2 bg-white p-4 rounded-lg border">
          {!plan ? (
            <p className="text-gray-600">Enter trip + vehicle details to generate a plan.</p>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-700">Distance: <b>{plan.total_distance_km} km</b> · ETA: <b>{plan.estimated_duration_minutes} min</b></p>
              {plan.stops?.length ? (
                <div>
                  <p className="font-semibold mb-2">Stops</p>
                  <ul className="space-y-2">
                    {plan.stops.map((s, i) => (
                      <li key={i} className="p-3 border rounded">
                        <p className="font-medium">{s.station_name}</p>
                        <p className="text-sm text-gray-600">Charge {s.charge_minutes} min · ({s.latitude.toFixed(4)}, {s.longitude.toFixed(4)})</p>
                        {s.notes && <p className="text-sm text-gray-500 mt-1">{s.notes}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-green-700 font-medium">No charging stops needed ✅</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
