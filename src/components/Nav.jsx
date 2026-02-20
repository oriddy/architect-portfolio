import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/',          label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about',     label: 'About' },
  { to: '/contact',   label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const location = useLocation()
  const isHome   = location.pathname === '/'

  useEffect(() => {
    if (!isHome) { setScrolled(true); return }
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [isHome])

  useEffect(() => {
    setOpen(false)
    document.body.classList.remove('no-scroll')
  }, [location.pathname])

  const toggle = () => {
    const next = !open
    setOpen(next)
    document.body.classList.toggle('no-scroll', next)
  }

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav__inner">
          <Link to="/" className="nav__logo" aria-label="Webb Studio Home">
            <span className="nav__logo-name">Webb Studio</span>
            <span className="nav__logo-sub">Architecture</span>
          </Link>

          <ul className="nav__links" role="list">
            {LINKS.map(l => (
              <li key={l.to}>
                <Link to={l.to} className={`nav__link${location.pathname === l.to ? ' active' : ''}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link to="/contact" className="nav__cta">Start a project</Link>

          <button className={`nav__burger${open ? ' open' : ''}`} onClick={toggle} aria-label="Toggle menu" aria-expanded={open}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`nav__mobile${open ? ' open' : ''}`} role="dialog" aria-label="Mobile navigation">
        <ul className="nav__mobile-links" role="list">
          {LINKS.map(l => (
            <li key={l.to}><Link to={l.to} className="nav__mobile-link">{l.label}</Link></li>
          ))}
        </ul>
        <div className="nav__mobile-footer">
          <span>© 2024 Webb Studio</span>
          <span>New York, NY</span>
        </div>
      </div>
    </>
  )
}
