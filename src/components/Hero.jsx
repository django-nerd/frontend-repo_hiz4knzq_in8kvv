export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Plan smarter EV trips with intelligent charging
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Ampora finds optimal stops, books chargers, and helps you save with the right plan. All in one seamless experience.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="/plan" className="px-5 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700">Plan a Trip</a>
              <a href="/plans" className="px-5 py-3 bg-white border rounded-md font-semibold hover:bg-gray-50">See Plans</a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-xl bg-white/70 backdrop-blur border shadow-sm flex items-center justify-center">
              <div className="text-center p-6">
                <p className="text-2xl font-bold text-blue-700">Ampora</p>
                <p className="text-gray-600 mt-2">EV trip planner • Smart charging • Membership savings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
