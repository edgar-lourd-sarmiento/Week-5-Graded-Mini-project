import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div className="page-content">
      <section className="dashboard-hero">
        <div>
          <span className="eyebrow">Team workspace</span>

          <h1 className="page-heading">
            Simple work, clearly organized.
          </h1>

          <p className="page-copy">
            Keep team priorities visible, understand what is moving,
            and make every workday feel a little calmer.
          </p>

          <Link className="primary-button" to="/tasks">
            View all tasks
          </Link>
        </div>

        <div className="overview-card">
          <strong>10</strong>
          <span>Tasks loaded from JSONPlaceholder</span>
        </div>
      </section>
    </div>
  )
}

export default Dashboard;