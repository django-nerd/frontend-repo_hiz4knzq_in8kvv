import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Crown, Zap } from 'lucide-react'

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
    <section id="plans" className="max-w-6xl mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold"
      >
        Membership Plans
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {plans.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 * idx }}
            className="relative p-6 bg-white/80 backdrop-blur border rounded-2xl shadow-sm overflow-hidden"
          >
            <div className="absolute inset-x-0 -top-24 h-40 bg-gradient-to-b from-blue-500/10 to-transparent" />
            <div className="relative">
              <p className="text-lg font-semibold flex items-center justify-center gap-2">
                {idx === plans.length - 1 ? <Crown className="h-4 w-4 text-amber-500" /> : <Zap className="h-4 w-4 text-blue-600" />}
                {p.name}
              </p>
              <p className="text-4xl font-extrabold mt-2 text-center">${p.monthly_fee_usd}<span className="text-base font-medium">/mo</span></p>
              <p className="text-sm text-gray-600 mt-2 text-center">Includes {p.kwh_included} kWh</p>
              <p className="text-sm text-gray-600 text-center">${p.overage_price_per_kwh}/kWh after</p>
              <div className="mt-4 flex justify-center">
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-lg font-medium shadow">Choose</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
