import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useCounter } from '../hooks/useCounter'
import Marquee from '../components/Marquee'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'
import { testimonials } from '../data/testimonials'

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 8h10M8 3l5 5-5 5"/>
  </svg>
)

const services = [
  { num: '01', title: 'Architectural Design' },
  { num: '02', title: 'Interior Design' },
  { num: '03', title: 'Urban Planning & Masterplanning' },
  { num: '04', title: 'Sustainable & Passive Design' },
  { num: '05', title: 'Project Management & Consulting' },
]

const awards = [
  { name: 'AIA Excellence Award',    year: '2023' },
  { name: 'Architizer A+ Award',     year: '2022' },
  { name: 'RIBA International Award',year: '2021' },
  { name: 'Dezeen Architect of the Year', year: '2020' },
]

export default function Home() {
  useScrollReveal()
  useCounter()

  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSlide(s => (s + 1) % testimonials.length), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      {/* HERO */}
      <section className="hero" aria-label="Hero">
        <div className="hero__bg">
          <img
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80"
            alt="Modern architectural building"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="hero__overlay" />
        <div className="hero__content wrap">
          <p className="hero__eyebrow">Award-winning architecture studio</p>
          <h1 className="hero__title">
            <span className="line"><span>Designing Spaces</span></span>
            <span className="line"><span>That <em>Endure.</em></span></span>
          </h1>
          <div className="hero__meta">
            <div className="hero__scroll">
              <span className="hero__scroll-line" />
              Scroll to explore
            </div>
            <div className="hero__stats">
              {[['24+','Years of practice'],['180+','Projects built'],['18','Design awards']].map(([n,l]) => (
                <div className="hero__stat" key={l}>
                  <div className="hero__stat-num">{n}</div>
                  <div className="hero__stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* FEATURED WORKS */}
      <section className="featured section" id="works">
        <div className="wrap">
          <div className="featured__header" data-reveal="up">
            <h2 className="featured__title">Selected<br /><em>Works</em></h2>
            <Link to="/portfolio" className="btn btn--outline">
              View all projects <ArrowIcon />
            </Link>
          </div>
          <div className="featured__grid" data-stagger>
            <ProjectCard project={projects[0]} wide />
            <ProjectCard project={projects[1]} />
            <ProjectCard project={projects[2]} />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats section--dark" aria-label="Studio statistics">
        <div className="wrap">
          <div className="stats__grid" data-stagger>
            {[
              { count: 24,  suffix: '+', label: 'Years of practice',  desc: 'Founded in 2000, shaping the built environment for over two decades.' },
              { count: 180, suffix: '+', label: 'Projects completed', desc: 'From intimate residences to landmark cultural institutions.' },
              { count: 18,  suffix: '',  label: 'Design awards',      desc: 'Including AIA Excellence, Architizer A+, and RIBA International.', star: true },
              { count: 12,  suffix: '',  label: 'Countries',          desc: 'A global practice rooted in New York, with studios in London and Tokyo.' },
            ].map(s => (
              <div className="stats__item" key={s.label}>
                <div className="stats__num">
                  <span data-count={s.count} data-suffix={s.suffix}>{s.count}{s.suffix}</span>
                  {s.star && <span style={{color:'var(--accent)'}}> ★</span>}
                </div>
                <p className="stats__label">{s.label}</p>
                <p className="stats__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services section" aria-labelledby="services-title">
        <div className="wrap">
          <div className="services__header">
            <div data-reveal="up">
              <p className="section-label">What we do</p>
              <h2 className="services__title" id="services-title">Our<br />Services</h2>
            </div>
            <p className="services__intro" data-reveal="up" data-delay="0.15">
              We offer a full spectrum of architectural and design services — from early concept through to construction completion — tailored to each client's vision.
            </p>
          </div>
          <ul className="services__list" data-stagger>
            {services.map(s => (
              <li key={s.num}>
                <Link to="/contact" className="service-item">
                  <span className="service-item__num">{s.num}</span>
                  <span className="service-item__title">{s.title}</span>
                  <span className="service-item__arrow" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M8 3l5 5-5 5"/></svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="about-teaser" aria-labelledby="about-teaser-title">
        <div className="wrap">
          <div className="about-teaser__inner">
            <div className="about-teaser__img img-wrap" data-reveal="scale">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&q=80" alt="Marcus Webb, Principal Architect" loading="lazy" />
              <div className="about-teaser__badge">Principal Architect</div>
            </div>
            <div className="about-teaser__content">
              <p className="section-label" data-reveal="fade">About the studio</p>
              <h2 className="about-teaser__title" id="about-teaser-title" data-reveal="up">
                Architecture that<br />speaks without<br /><em>words.</em>
              </h2>
              <p className="about-teaser__text" data-reveal="up" data-delay="0.1">
                Marcus Webb founded Webb Studio in 2000 with a singular ambition: to design spaces that elevate the human experience. Working across scales — from the intimate detail of a private home to the civic scale of a cultural institution — the studio approaches every project as an opportunity to create something genuinely extraordinary.
              </p>
              <Link to="/about" className="btn btn--primary" data-reveal="up" data-delay="0.2">
                Our story <ArrowIcon />
              </Link>
              <div className="about-teaser__awards" data-stagger>
                {awards.map(a => (
                  <div key={a.name} className="award-row">
                    <span className="award-row__name">{a.name}</span>
                    <span className="award-row__year">{a.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="testimonial" aria-label="Client testimonials">
        <div className="testimonial__bg-text" aria-hidden="true">Trust</div>
        <div className="wrap">
          <div style={{minHeight:'280px',position:'relative'}}>
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                style={{
                  position: i === 0 ? 'relative' : 'absolute',
                  inset: 0,
                  opacity: i === slide ? 1 : 0,
                  transition: 'opacity 0.7s ease',
                  pointerEvents: i === slide ? 'auto' : 'none',
                  textAlign: 'center',
                }}
              >
                <blockquote className="testimonial__quote">{t.quote}</blockquote>
                <p className="testimonial__author">{t.author}</p>
              </div>
            ))}
          </div>
          <div className="testimonial__dots" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonial__dot${i === slide ? ' active' : ''}`}
                onClick={() => setSlide(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band" aria-label="Call to action">
        <div className="wrap">
          <div className="cta-band__big" data-reveal="up">
            Let's build
            <em>something</em>
            <Link to="/contact" className="btn btn--primary">
              Get in touch <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
