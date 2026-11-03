import { NavLink, Route, Routes } from 'react-router-dom'
import About from './components/About.jsx'
import TaskList from './components/TaskList.jsx'
import Dashboard from './components/Dashboard.jsx'
import StatsList from './components/StatsList.jsx'

import './App.css'

function App() {
  return (
    <main className="app">
      <section className="browser-shell">
        <header className="site-header">
          <NavLink className="logo" to="/">
            Task<span>Board</span>
          </NavLink>

          <nav className="navigation" aria-label="Main navigation">
            <NavLink className="nav-link" to="/tasks">
              Tasks
            </NavLink>

            <NavLink className="nav-link" to="/stats">
              Stats
            </NavLink>

            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/stats" element={<StatsList />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </section>

      <p className="footer-note">
        A calm place for getting things done.
      </p>
    </main>
  )
}

export default App