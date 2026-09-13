import Dashboard from '../components/Dashboard'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import SpendingChart from '../components/SpendingChart'
import BudgetRecommendations from '../components/BudgetRecommendations'
import { useState } from 'react'

export default function Home() {
  const [refresh, setRefresh] = useState(0)

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-white mb-8">Financial Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Dashboard refresh={refresh} />
        </div>
        <div>
          <TransactionForm onSuccess={() => setRefresh(r => r + 1)} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SpendingChart refresh={refresh} />
        <BudgetRecommendations refresh={refresh} />
      </div>
      <TransactionList refresh={refresh} />
    </div>
  )
}