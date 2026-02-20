import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useCounter } from '../hooks/useCounter'
import Marquee from '../components/Marquee'

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 8h10M8 3l5 5-5 5"/>
  </svg>
)

const processSteps = [
  { num: '01', title: 'Discovery',  text: 'We begin every project by listening — deeply. Understanding your vision, needs, site and budget before a single line is drawn.' },
  { num: '02', title: 'Concept',    text: 'We develop a clear spatial and material concept that responds to the brief and the specific character of the place.' },
  { num: '03', title: 'Design',     text: 'Rigorous design development across all scales — from site planning and structure to the finest material detail.' },
  { num: '04', title: 'Delivery',   text: 'Hands-on construction administration ensures the built work matches the ambition of the drawings — and then exceeds it.' },
]

const timeline = [
  { year: '2000', title: 'Webb Studio founded',            text: 'Established in a single-room office in SoHo, New York, with a team of three architects.' },
  { year: '2005', title: 'First major public commission',  text: "The Riverside Community Library, Brooklyn — a 12,000 sq ft public building that established the studio's civic reputation." },
  { year: '2010', title: 'London studio opens',            text: 'Expansion into Europe with a new studio in Clerkenwell, London.' },
  { year: '2014', title: 'AIA Fellow designation',         text: 'Marcus Webb elected Fellow of the American Institute of Architects.' },
  { year: '2018', title: 'Tokyo office established',       text: 'A third studio opened in Tokyo, completing a global network.' },
  { year: '2023', title: 'Cascade Residence — AIA Award',  text: 'The Malibu residence wins the AIA National Excellence Award.' },
]

const awards = [
  { name: 'AIA National Excellence Award',  year: '2023' },
  { name: 'Architizer A+ Award — Residential', year: '2022' },
  { name: 'RIBA International Award',       year: '2021' },
  { name: 'Dezeen Architect of the Year',   year: '2020' },
  { name: 'AD100 — Architectural Digest',   year: '2019–2024' },
]

export default function About() {
  useScrollReveal()
  useCounter()

  return (
    <>
      <header className="page-hero" aria-labelledby="about-title">
        <div className="wrap">
          <p className="page-hero__eyebrow" data-reveal="fade">About the studio</p>
          <h1 className="page-hero__title" id="about-title" data-reveal="up">We design<br /><em>meaning.</em></h1>
          <p className="page-hero__sub" data-reveal="up" data-delay="0.15">
            Architecture is the art of creating spaces that shape how we live, work and feel. At Webb Studio, we have spent 24 years pursuing that art with rigour, curiosity and care.
          </p>
        </div>
      </header>

      <Marquee />

      {/* ABOUT INTRO */}
      <section className="about-intro section" aria-labelledby="about-intro-title">
        <div className="wrap">
          <div className="about-intro__inner">
            <div className="about-intro__img img-wrap" data-reveal="scale">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&q=80" alt="Marcus Webb, Principal Architect" loading="lazy" />
            </div>
            <div>
              <p className="section-label" data-reveal="fade">Marcus Webb</p>
              <h2 className="about-statement" id="about-intro-title" data-reveal="up">
                Every project begins with a single question:<br /><em>what does this place want to become?</em>
              </h2>
              <div className="about-body" data-reveal="up" data-delay="0.1">
                <p>Marcus Webb studied architecture at Yale before completing his postgraduate studies at the Architectural Association in London. He spent the early years of his career at Renzo Piano Building Workshop in Paris, where he developed a deep reverence for materiality and the poetics of structure.</p>
                <p>In 2000, he returned to New York and founded Webb Studio with a belief that architecture should be both intellectually rigorous and profoundly human. The practice has since grown to a team of 38 architects, designers and specialists.</p>
                <p>Marcus is a Fellow of the American Institute of Architects, a visiting professor at Columbia GSAPP, and the author of <em>The Weight of Light</em> (Phaidon, 2019).</p>
              </div>
              <div data-reveal="up" data-delay="0.2">
                <Link to="/contact" className="btn btn--primary">Work with us <ArrowIcon /></Link>
              </div>
              <div style={{marginTop:'56px',paddingTop:'40px',borderTop:'1px solid var(--border)'}} data-stagger>
                <p className="section-label" style={{marginBottom:'24px'}}>Recognition</p>
                {awards.map(a => (
                  <div key={a.name} style={{display:'flex',justifyContent:'space-between',padding:'12px 0',borderBottom:'1px solid var(--border)',fontSize:'13px'}}>
                    <span style={{fontWeight:600}}>{a.name}</span>
                    <span style={{color:'var(--fg-muted)'}}>{a.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process" aria-labelledby="process-title">
        <div className="wrap">
          <p className="section-label" data-reveal="fade">How we work</p>
          <h2 className="process__title" id="process-title" data-reveal="up">Our<br /><em>Process</em></h2>
          <div className="process__steps" data-stagger>
            {processSteps.map(s => (
              <div className="process__step" key={s.num}>
                <div className="process__step-num">{s.num}</div>
                <h3 className="process__step-title">{s.title}</h3>
                <p className="process__step-text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="timeline section" aria-labelledby="timeline-title">
        <div className="wrap">
          <p className="section-label" data-reveal="fade">Career milestones</p>
          <h2 className="timeline__title" id="timeline-title" data-reveal="up">A Studio<br /><em>History</em></h2>
          <div className="timeline__list" data-stagger>
            {timeline.map(t => (
              <div className="timeline__item" key={t.year}>
                <div className="timeline__year">{t.year}</div>
                <div>
                  <h3 className="timeline__event-title">{t.title}</h3>
                  <p className="timeline__event-text">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats section--dark" aria-label="Studio statistics">
        <div className="wrap">
          <div className="stats__grid" data-stagger>
            {[
              { count: 38,  suffix: '', label: 'Team members', desc: 'Architects, designers, landscape experts and technical specialists.' },
              { count: 3,   suffix: '', label: 'Global studios', desc: 'New York, London and Tokyo — working across every time zone.' },
              { count: 180, suffix: '+', label: 'Projects built', desc: 'Across 12 countries and four continents.' },
              { count: 18,  suffix: '', label: 'Awards won', desc: 'International recognition spanning two decades of practice.', star: true },
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

      {/* CTA */}
      <section className="cta-band" aria-label="Call to action">
        <div className="wrap">
          <div className="cta-band__big" data-reveal="up">
            Ready to<br /><em>begin?</em>
            <Link to="/contact" className="btn btn--primary">Contact us <ArrowIcon /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
