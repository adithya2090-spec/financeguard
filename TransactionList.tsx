import { useState, useEffect } from 'react'
import { getTransactions } from '../api/transactions'

interface Transaction {
  id: number
  timestamp: string
  merchant: string
  category: string
  amount: number
  isFraudulent: boolean
  fraudScore: number
  description: string
}

export default function TransactionList({ refresh }: { refresh: number }) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    getTransactions().then(setTransactions).catch(console.error)
  }, [refresh])

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
      <h3 className="font-semibold text-white p-6 pb-0">Transaction History</h3>
      {transactions.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-8">No transactions yet</p>
      ) : (
        <table className="w-full text-left mt-4">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="px-6 py-3 font-semibold">Date</th>
              <th className="px-6 py-3 font-semibold">Merchant</th>
              <th className="px-6 py-3 font-semibold">Category</th>
              <th className="px-6 py-3 font-semibold">Amount</th>
              <th className="px-6 py-3 font-semibold">Fraud Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {transactions.map(t => (
              <tr key={t.id} className="text-slate-300">
                <td className="px-6 py-4">{new Date(t.timestamp).toLocaleDateString()}</td>
                <td className="px-6 py-4">{t.merchant}</td>
                <td className="px-6 py-4">{t.category}</td>
                <td className="px-6 py-4">£{t.amount.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    t.isFraudulent ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'
                  }`}>
                    {t.isFraudulent ? 'FLAGGED' : 'CLEAN'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
