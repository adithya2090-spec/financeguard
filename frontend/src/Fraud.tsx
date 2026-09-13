import FraudAlerts from '../components/FraudAlerts'

export default function Fraud() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-white mb-2">Fraud Detection Centre</h2>
      <p className="text-slate-400 mb-8">Real-time ML-powered transaction monitoring</p>
      <FraudAlerts />
    </div>
  )
}