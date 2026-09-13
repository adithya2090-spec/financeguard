import { useState, useEffect } from 'react'
import axios from 'axios'
import { Wallet, ArrowUpDown, TrendingDown, AlertTriangle } from 'lucide-react'
import { API_URL, getAuthHeader } from '../api/auth'

interface DashboardData {
  balance: number
  totalTransactions: number
  totalSpent: number
  activeFraudAlerts: number
}

export default function Dashboard({ refresh }: { refresh: number }) {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${API_URL}/api/dashboard`, { headers: getAuthHeader() })
        setData(res.data)
      } catch (err) {
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [refresh])

  if (loading) return <div className="text-white">Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!data) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 flex items-center">
        <div className="p-3 rounded-full bg-blue-500/20 text-blue-500 mr-4">
          <Wallet size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-400">Balance</p>
          <p className="text-2xl font-bold text-white">£{data.balance.toFixed(2)}</p>
        </div>
      </div>
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 flex items-center">
        <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-500 mr-4">
          <ArrowUpDown size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-400">Transactions</p>
          <p className="text-2xl font-bold text-white">{data.totalTransactions}</p>
        </div>
      </div>
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 flex items-center">
        <div className="p-3 rounded-full bg-orange-500/20 text-orange-500 mr-4">
          <TrendingDown size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-400">Total Spent</p>
          <p className="text-2xl font-bold text-white">£{data.totalSpent.toFixed(2)}</p>
        </div>
      </div>
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 flex items-center">
        <div className="p-3 rounded-full bg-red-500/20 text-red-500 mr-4">
          <AlertTriangle size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-400">Fraud Alerts</p>
          <p className="text-2xl font-bold text-white">{data.activeFraudAlerts}</p>
        </div>
      </div>
    </div>
  )
}
