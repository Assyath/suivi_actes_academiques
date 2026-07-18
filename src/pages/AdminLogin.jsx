import { useState } from 'react'
import './AdminLogin.css'

function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [erreur, setErreur] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    setErreur('')

    // Authentification simple (en production, utiliser un vrai système d'authentification)
    if (username === 'admin' && password === 'admin123') {
      onLoginSuccess()
    } else {
      setErreur('Identifiants incorrects. Veuillez réessayer.')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Connexion Admin</h1>
        {erreur && <div className="alert error">{erreur}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button className="primary" type="submit">
            Se connecter
          </button>
        </form>
        <p className="demo-info">Identifiants de démo: admin / admin123</p>
      </div>
    </div>
  )
}

export default AdminLogin
