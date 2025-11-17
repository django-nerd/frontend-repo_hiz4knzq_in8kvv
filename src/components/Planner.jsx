import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Route, BatteryCharging, Sparkles } from 'lucide-react'

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
    <section id="plan" className="max-w-6xl mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold"
      >
        Trip Planner
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="bg-white/80 backdrop-blur p-5 rounded-xl border shadow-sm space-y-4"
        >
          <div className="grid grid-cols-2 gap-3">
            {Object.keys(form).map((key) => (
              <label key={key} className="text-sm text-gray-700">
                <span className="block mb-1 capitalize flex items-center gap-2">
                  {key.includes('lat') || key.includes('lng') ? <MapPin className="h-4 w-4" /> : null}
                  {key.includes('battery') || key.includes('efficiency') ? <BatteryCharging className="h-4 w-4" /> : null}
                  {key.replaceAll('_', ' ')}
                </span>
                <input
                  type="number"
                  step="any"
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </label>
            ))}
          </div>
          <button
            onClick={submit}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-2.5 rounded-lg font-semibold shadow hover:opacity-95"
            disabled={loading}
          >
            <Route className="h-4 w-4" />
            {loading ? 'Planning…' : 'Plan Trip'}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-2 bg-white/80 backdrop-blur p-6 rounded-xl border shadow-sm"
        >
          {!plan ? (
            <p className="text-gray-600">Enter trip + vehicle details to generate a plan.</p>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-700">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <p>
                  Distance: <b>{plan.total_distance_km} km</b> · ETA: <b>{plan.estimated_duration_minutes} min</b>
                </p>
              </div>
              {plan.stops?.length ? (
                <div>
                  <p className="font-semibold mb-2">Stops</p>
                  <ul className="space-y-3">
                    {plan.stops.map((s, i) => (
                      <li key={i} className="p-3 border rounded-lg bg-white">
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
        </motion.div>
      </div>
    </section>
  )
}
