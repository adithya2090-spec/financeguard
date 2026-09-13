import { useState } from 'react'
import { createTransaction } from '../api/transactions'

export default function TransactionForm({ onSuccess }: { onSuccess: () => void }) {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [merchant, setMerchant] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<{type: 'success'|'error', msg: string}|null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createTransaction({ amount: Number(amount), category, merchant, description })
      setStatus({ type: 'success', msg: 'Transaction added' })
      setAmount('')
      setMerchant('')
      setDescription('')
      onSuccess()
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to add transaction' })
    }
  }

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <h3 className="text-lg font-bold text-white mb-4">Add Transaction</h3>
      {status && (
        <div className={`mb-4 p-2 rounded ${status.type === 'success' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
          {status.msg}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Amount</label>
          <input type="number" step="0.01" required value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white">
            <option>Food</option>
            <option>Transport</option>
            <option>Entertainment</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Healthcare</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Merchant</label>
          <input type="text" required value={merchant} onChange={e => setMerchant(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Description</label>
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white" />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  )
}
