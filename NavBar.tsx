import { Link, useNavigate } from 'react-router-dom'
import { Shield, LayoutDashboard, LogOut } from 'lucide-react'

export default function NavBar() {
  const navigate = useNavigate()
  const logout = () => { localStorage.removeItem('token'); navigate('/login') }

  return (
    <nav className="border-b border-slate-800 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="text-blue-500" size={22} />
          <span className="font-bold text-white text-lg">FinanceGuard</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-slate-300 hover:text-white text-sm">
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <Link to="/fraud" className="flex items-center gap-2 text-slate-300 hover:text-white text-sm">
            <Shield size={16} /> Fraud Alerts
          </Link>
          <button onClick={logout} className="flex items-center gap-2 text-slate-400 hover:text-red-400 text-sm">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </div>
    </nav>
  )
}