import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import axios from 'axios'

const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']
const API = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export default function SpendingChart({ refresh }: { refresh: number }) {
  const [data, setData] = useState<{ name: string; value: number }[]>([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get(`${API}/api/transactions/spending`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      const chartData = Object.entries(res.data).map(([name, value]) => ({
        name, value: Math.round(value as number)
      }))
      setData(chartData)
    })
  }, [refresh])

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <h3 className="font-semibold text-white mb-4">Spending by Category</h3>
      {data.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-8">No transactions yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip formatter={(v) => `£${v}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}