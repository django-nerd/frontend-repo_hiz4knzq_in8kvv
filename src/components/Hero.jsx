import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-emerald-400/25 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-16 pb-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900"
            >
              Plan smarter EV trips with intelligent charging
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-4 text-gray-600 text-lg"
            >
              Ampora finds optimal stops, books chargers, and helps you save with the right plan. All in one seamless experience.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 flex gap-3"
            >
              <a href="#plan" className="px-5 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 shadow">Plan a Trip</a>
              <a href="#plans" className="px-5 py-3 bg-white/80 border rounded-md font-semibold hover:bg-white">See Plans</a>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="relative"
          >
            <div className="aspect-video rounded-xl bg-white/70 backdrop-blur border shadow-sm flex items-center justify-center">
              <div className="text-center p-6">
                <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-emerald-600">Ampora</p>
                <p className="text-gray-600 mt-2">EV trip planner • Smart charging • Membership savings</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
