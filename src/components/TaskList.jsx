import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { fetchTasks, people } from '../tasks'

const PAGE_SIZE = 50

function TaskList() {
  const queryClient = useQueryClient()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [user, setUser] = useState('All')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const {
    data: tasks = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    staleTime: 60_000,
    retry: false,
  })

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(query.toLowerCase())

      const matchesStatus =
        status === 'All' || task.status === status

      const matchesUser =
        user === 'All' || task.assignee === user

      return matchesSearch && matchesStatus && matchesUser
    })
  }, [tasks, query, status, user])

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [query, status, user])

  const visibleTasks = filteredTasks.slice(0, visibleCount)
  const hasMore = visibleCount < filteredTasks.length

  const doneCount = tasks.filter(
    (task) => task.status === 'Done',
  ).length

  function toggleTask(id) {
    queryClient.setQueryData(['tasks'], (current = []) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'Done' ? 'Open' : 'Done',
            }
          : task,
      ),
    )
  }

  function showMore() {
    setVisibleCount((current) =>
      Math.min(current + PAGE_SIZE, filteredTasks.length),
    )
  }

  return (
    <div className="page-content">
      <div className="filter-row">
        <label className="search-wrap">
          <span className="search-label">Search Tasks</span>

          <div className="search-input-wrap">
            <svg
              className="search-icon"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="8.5"
                cy="8.5"
                r="5.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="m12.5 12.5 4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            <input
              className="field search-field"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tasks..."
            />
          </div>
        </label>

        <div className="filter-group">
          <select
            id="status"
            className="field select-field"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="All">All statuses</option>
            <option value="Open">Open</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="filter-group">
          <select
            id="user"
            className="field select-field"
            value={user}
            onChange={(event) => setUser(event.target.value)}
          >
            <option value="All">All users</option>
            {people.map((person, index) => (
              <option key={index} value={person}>
                {person}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="list-meta">
        <strong>
          Showing {visibleTasks.length} of {filteredTasks.length}{' '}
          filtered tasks ({tasks.length} total)
        </strong>
        <span>{doneCount} completed</span>
      </div>

      <div className="task-list">
        {isPending && (
          <p className="list-message">
            Loading tasks...
          </p>
        )}

        {error && (
          <p className="list-message error">
            {error.message}
          </p>
        )}

        {visibleTasks.map((task) => (
          <article className="task-card" key={task.id}>
            <button
              className={`task-checkbox ${
                task.status === 'Done' ? 'checked' : ''
              }`}
              onClick={() => toggleTask(task.id)}
              aria-label={`Mark ${task.title} as ${
                task.status === 'Done' ? 'open' : 'done'
              }`}
            >
              {task.status === 'Done' ? '✓' : ''}
            </button>

            <h2
              className={`task-title ${
                task.status === 'Done' ? 'complete' : ''
              }`}
            >
              {task.title}
            </h2>

            <span className="assignee-pill">
              {task.assignee}
            </span>

            <span
              className={`status-pill ${
                task.status === 'Done' ? 'done' : ''
              }`}
            >
              {task.status}
            </span>
          </article>
        ))}

        {!isPending &&
          !error &&
          filteredTasks.length === 0 && (
            <p className="list-message">
              No tasks match those filters.
            </p>
          )}
      </div>

      {hasMore && (
        <div className="load-more-wrap">
          <button
            type="button"
            className="primary-button load-more-button"
            onClick={showMore}
          >
            Show {Math.min(PAGE_SIZE, filteredTasks.length - visibleCount)} more
          </button>
        </div>
      )}
    </div>
  )
}

export default TaskList
