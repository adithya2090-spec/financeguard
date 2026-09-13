import { useState, useEffect } from 'react'
import { Lightbulb } from 'lucide-react'
import { getRecommendations } from '../api/transactions'

interface RecommendationsData {
  total_spent: number
  tips: string[]
}

export default function BudgetRecommendations({ refresh }: { refresh: number }) {
  const [data, setData] = useState<RecommendationsData | null>(null)

  useEffect(() => {
    getRecommendations().then(setData).catch(console.error)
  }, [refresh])

  if (!data) return null

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-full bg-yellow-500/20 text-yellow-500 mr-4">
          <Lightbulb size={24} />
        </div>
        <h3 className="text-lg font-bold text-white">AI Budget Insights</h3>
      </div>
      <p className="text-slate-400 mb-4">Total Spent this month: <span className="text-white font-bold">£{data.total_spent.toFixed(2)}</span></p>
      <ul className="space-y-3">
        {data.tips.map((tip, i) => (
          <li key={i} className="flex items-start text-slate-300">
            <span className="text-yellow-500 mr-2">•</span> {tip}
          </li>
        ))}
      </ul>
    </div>
  )
}
