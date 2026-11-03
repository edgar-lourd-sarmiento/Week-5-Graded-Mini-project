import { useQuery } from '@tanstack/react-query'
import { fetchTasks, people } from '../tasks'

function StatsList() {
  const {
    data: tasks = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    staleTime: Infinity,
  })

  const total = tasks.length
  const done = tasks.filter((task) => task.status === 'Done').length
  const open = total - done

  const stats = [
    { value: total, label: 'Total' },
    { value: done, label: 'Done' },
    { value: open, label: 'Open' },
  ]

  const progress = people.map((person) => {
    const personTasks = tasks.filter(
      (task) => task.assignee === person,
    )
    const doneCount = personTasks.filter(
      (task) => task.status === 'Done',
    ).length
    const personTotal = personTasks.length
    const value =
      personTotal === 0
        ? 0
        : Math.round((doneCount / personTotal) * 100)

    return {
      name: person.split(' ')[0],
      value,
      count: `${doneCount}/${personTotal}`,
    }
  })

  return (
    <div className="page-content">
      <h1 className="page-heading">Overview</h1>

      {isPending && (
        <p className="list-message">Loading stats...</p>
      )}

      {error && (
        <p className="list-message error">{error.message}</p>
      )}

      {!isPending && !error && (
        <>
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
        </>
      )}
    </div>
  )
}

export default StatsList