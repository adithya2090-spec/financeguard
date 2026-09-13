import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Fraud from './pages/Fraud'
import NavBar from './components/NavBar'

function App() {
  const token = localStorage.getItem('token')

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        {token && <NavBar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
          <Route path="/fraud" element={token ? <Fraud /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App