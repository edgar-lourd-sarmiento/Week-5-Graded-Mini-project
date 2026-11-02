import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="page-content about-content">
      <span className="about-icon">TB</span>

      <h1 className="page-heading">
        Simple work, clearly organized.
      </h1>

      <p className="page-copy">
        TaskBoard is a lightweight workspace for keeping team priorities
        visible and progress easy to understand.
      </p>
      <Link className="primary-button" to="/">
        Back to TaskBoard
      </Link>

    </div>
  )
}
export default About;