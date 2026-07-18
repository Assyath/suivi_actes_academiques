import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import UserPage from './pages/UserPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false)
  }

  return (
    <Router>
      <div className="app">
        <header>
          <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h1>Suivi des Actes Académiques</h1>
            <nav>
              <Link to="/" style={{color: 'white', marginRight: 16}}>Consulter</Link>
              <Link to="/admin/login" style={{color: 'white', marginRight: 16}}>Admin</Link>
              {isAdminLoggedIn && (
                <button className="secondary" onClick={handleAdminLogout}>Déconnexion</button>
              )}
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route
            path="/admin/login"
            element={
              isAdminLoggedIn ? <Navigate to="/admin" /> : <AdminLogin onLoginSuccess={() => setIsAdminLoggedIn(true)} />
            }
          />
          <Route
            path="/admin"
            element={isAdminLoggedIn ? <AdminDashboard onLogout={handleAdminLogout} /> : <Navigate to="/admin/login" />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
