import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { projects } from '../data/projects'

const FILTERS = [
  { key: 'all',         label: 'All Projects' },
  { key: 'residential', label: 'Residential' },
  { key: 'commercial',  label: 'Commercial' },
  { key: 'cultural',    label: 'Cultural' },
  { key: 'interior',    label: 'Interior' },
]

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 8h10M8 3l5 5-5 5"/>
  </svg>
)

export default function Portfolio() {
  useScrollReveal()
  const [active, setActive] = useState('all')
  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)

  return (
    <>
      <header className="page-hero section--alt" aria-labelledby="portfolio-title">
        <div className="wrap">
          <p className="page-hero__eyebrow" data-reveal="fade">Case Studies</p>
          <h1 className="page-hero__title" id="portfolio-title" data-reveal="up">Selected<br /><em>Work</em></h1>
          <p className="page-hero__sub" data-reveal="up" data-delay="0.15">
            180+ projects across residential, commercial and cultural typologies — each one a unique response to site, brief and vision.
          </p>
        </div>
      </header>

      <div className="portfolio-filter">
        <div className="wrap">
          <div className="filter-bar" role="group" aria-label="Filter projects">
            {FILTERS.map(f => (
              <button
                key={f.key}
                className={`filter-btn${active === f.key ? ' active' : ''}`}
                onClick={() => setActive(f.key)}
                data-filter={f.key}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="section">
        <div className="wrap">
          <div className="portfolio-grid" data-stagger>
            {filtered.map(p => (
              <article key={p.id} className="portfolio-item" data-category={p.category}>
                <Link to="/portfolio" className="project-card" aria-label={`${p.title} — ${p.category}`}>
                  <div className="project-card__img img-wrap">
                    <img src={p.img} alt={p.alt} loading="lazy" />
                    <div className="project-card__overlay">
                      <span className="project-card__hover-cta">
                        View case study
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M8 3l5 5-5 5"/></svg>
                      </span>
                    </div>
                  </div>
                  <div className="project-card__info">
                    <p className="project-card__cat">{p.category.charAt(0).toUpperCase() + p.category.slice(1)}</p>
                    <h2 className="project-card__title">{p.title}</h2>
                    <p className="project-card__sub">{p.location} — {p.year}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>

      <section className="cta-band section--alt" aria-label="Start a project">
        <div className="wrap">
          <div className="cta-band__big" data-reveal="up">
            Have a project<br /><em>in mind?</em>
            <Link to="/contact" className="btn btn--primary">Let's talk <ArrowIcon /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
