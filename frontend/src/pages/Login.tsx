import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export default function Login() {
  const [email, setEmail] = useState('demo@financeguard.io')
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${API}/api/auth/login`, { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch {
      setError('Invalid credentials. Try demo@financeguard.io / password123')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-slate-900 rounded-2xl border border-slate-800">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">FinanceGuard</h1>
          <p className="text-slate-400 mt-1">Banking intelligence platform</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}