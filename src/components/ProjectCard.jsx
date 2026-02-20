import { Link } from 'react-router-dom'

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 8h10M8 3l5 5-5 5"/>
  </svg>
)

export default function ProjectCard({ project, wide = false }) {
  return (
    <Link to="/portfolio" className={`project-card${wide ? ' project-card--wide' : ''}`} aria-label={`${project.title} project`}>
      <div className="project-card__img img-wrap">
        <img src={project.img} alt={project.alt} loading="lazy" />
        <div className="project-card__overlay">
          <span className="project-card__hover-cta">View case study <ArrowIcon /></span>
        </div>
      </div>
      <div className="project-card__info">
        <p className="project-card__cat">{project.category.charAt(0).toUpperCase() + project.category.slice(1)}</p>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__sub">{project.location} — {project.year}</p>
      </div>
    </Link>
  )
}
