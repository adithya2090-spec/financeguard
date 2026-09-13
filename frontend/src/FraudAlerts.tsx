import { useEffect, useState } from 'react'
import axios from 'axios'
import { AlertTriangle, CheckCircle } from 'lucide-react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8080'

interface Alert {
  id: number
  riskScore: number
  reason: string
  resolved: boolean
  createdAt: string
  transaction: { amount: number; merchant: string; category: string }
}

export default function FraudAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])

  const fetchAlerts = () => {
    const token = localStorage.getItem('token')
    axios.get(`${API}/api/fraud/alerts`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setAlerts(res.data))
  }

  const resolve = async (id: number) => {
    const token = localStorage.getItem('token')
    await axios.patch(`${API}/api/fraud/alerts/${id}/resolve`, {},
      { headers: { Authorization: `Bearer ${token}` } })
    fetchAlerts()
  }

  useEffect(() => { fetchAlerts() }, [])

  return (
    <div className="space-y-4">
      {alerts.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
          <CheckCircle className="mx-auto text-green-500 mb-3" size={32} />
          <p className="text-white font-medium">No fraud alerts</p>
          <p className="text-slate-400 text-sm mt-1">All transactions look normal</p>
        </div>
      )}
      {alerts.map(alert => (
        <div key={alert.id}
          className={`bg-slate-900 border rounded-xl p-5 ${alert.resolved ? 'border-slate-700 opacity-60' : 'border-red-500/50'}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className={alert.resolved ? 'text-slate-500' : 'text-red-400'} size={20} />
              <div>
                <p className="font-medium text-white">
                  £{alert.transaction?.amount?.toFixed(2)} at {alert.transaction?.merchant}
                </p>
                <p className="text-slate-400 text-sm mt-1">{alert.reason}</p>
                <div className="flex gap-3 mt-2">
                  <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">
                    Risk: {(alert.riskScore * 100).toFixed(0)}%
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">
                    {alert.transaction?.category}
                  </span>
                </div>
              </div>
            </div>
            {!alert.resolved && (
              <button onClick={() => resolve(alert.id)}
                className="text-sm text-green-400 hover:text-green-300 border border-green-500/30 px-3 py-1 rounded-lg">
                Resolve
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}