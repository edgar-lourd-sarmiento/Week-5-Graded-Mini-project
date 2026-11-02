import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const stats = [
    { value: 10, label: 'Total' },
    { value: 2, label: 'Done' },
    { value: 8, label: 'Open' },
  ]
  
  const progress = [
    { name: 'Leanne', value: 50, count: '1/2' },
    { name: 'Ervin', value: 0, count: '0/2' },
    { name: 'Clementine', value: 50, count: '1/2' },
    { name: 'Patricia', value: 0, count: '0/2' },
    { name: 'Chelsey', value: 0, count: '0/2' },
  ]
  
function StatsList() {
    return (
      <div className="page-content">
        <h1 className="page-heading">Overview</h1>
  
        <div className="stats-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
  
        <h2 className="section-label">
          Completed tasks by user
        </h2>
  
        <div className="progress-list">
          {progress.map((person) => (
            <div className="progress-row" key={person.name}>
              <span>{person.name}</span>
  
              <div className="progress-track">
                <div
                  className="progress-bar"
                  style={{ width: `${person.value}%` }}
                />
              </div>
  
              <span className="progress-value">
                {person.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

export default StatsList