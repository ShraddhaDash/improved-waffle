import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  return (
    <main className="octofit-shell">
      <div className="container py-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-white rounded shadow-sm mb-4 border">
          <div className="container-fluid">
            <span className="navbar-brand fw-bold text-primary">OctoFit Tracker</span>
            <div className="navbar-nav flex-row flex-wrap gap-3 ms-auto">
              <NavLink className="nav-link" to="/users">Users</NavLink>
              <NavLink className="nav-link" to="/teams">Teams</NavLink>
              <NavLink className="nav-link" to="/activities">Activities</NavLink>
              <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
              <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </main>
  )
}

export default App
