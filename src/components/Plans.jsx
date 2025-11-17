import { useEffect, useState } from 'react'

export default function Plans() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [plans, setPlans] = useState([])

  useEffect(() => {
    (async () => {
      const res = await fetch(`${baseUrl}/api/plans`)
      const data = await res.json()
      setPlans(data)
    })()
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold">Membership Plans</h2>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {plans.map(p => (
          <div key={p.id} className="p-6 bg-white border rounded-lg text-center">
            <p className="text-lg font-semibold">{p.name}</p>
            <p className="text-3xl font-extrabold mt-2">${p.monthly_fee_usd}<span className="text-base font-medium">/mo</span></p>
            <p className="text-sm text-gray-600 mt-2">Includes {p.kwh_included} kWh</p>
            <p className="text-sm text-gray-600">${p.overage_price_per_kwh}/kWh after</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Choose</button>
          </div>
        ))}
      </div>
    </section>
  )
}
