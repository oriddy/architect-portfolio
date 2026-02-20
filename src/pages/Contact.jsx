import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Link } from 'react-router-dom'

const socials = [
  { label: 'Instagram', href: 'https://instagram.com', icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: 'Behance', href: 'https://behance.net', icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.726zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/></svg> },
  { label: 'Pinterest', href: 'https://pinterest.com', icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg> },
]

const offices = [
  { city: 'New York',  addr: '120 West 25th Street\nNew York, NY 10001\nUnited States', tel: '+1 (212) 555-0147', href: 'tel:+12125550147' },
  { city: 'London',   addr: "14 St John's Square\nLondon EC1V 4AB\nUnited Kingdom", tel: '+44 (0) 207 123 4567', href: 'tel:+442071234567' },
  { city: 'Tokyo',    addr: 'Minami-Aoyama 3-1-30\nMinato-ku, Tokyo 107-0062\nJapan', tel: '+81 3 1234 5678', href: 'tel:+81312345678' },
]

export default function Contact() {
  useScrollReveal()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phone:'', projectType:'', budget:'', message:'' })

  const update = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = e => {
    e.preventDefault()
    setTimeout(() => setSent(true), 1200)
  }

  return (
    <>
      <header className="page-hero" aria-labelledby="contact-title">
        <div className="wrap">
          <p className="page-hero__eyebrow" data-reveal="fade">Get in touch</p>
          <h1 className="page-hero__title" id="contact-title" data-reveal="up">Let's build<br /><em>something.</em></h1>
          <p className="page-hero__sub" data-reveal="up" data-delay="0.15">
            Whether you have a fully-formed brief or just a hunch about what you need, we'd love to talk.
          </p>
        </div>
      </header>

      <section className="contact-section" aria-labelledby="contact-form-title">
        <div className="wrap">
          <div className="contact-section__inner">
            {/* LEFT */}
            <div className="contact-info">
              <h2 className="contact-info__title" id="contact-form-title" data-reveal="up">Say<br /><em>hello.</em></h2>
              <p className="contact-info__text" data-reveal="up" data-delay="0.1">We respond to every enquiry within one business day.</p>
              <div className="contact-details" data-stagger>
                {[
                  { icon:'✉', label:'Email',  value:<a href="mailto:hello@webbstudio.com">hello@webbstudio.com</a> },
                  { icon:'✆', label:'Phone',  value:<a href="tel:+12125550147">+1 (212) 555-0147</a> },
                  { icon:'◎', label:'New York', value:<>120 West 25th Street<br/>New York, NY 10001</> },
                  { icon:'◎', label:'London',   value:<>14 St John's Square<br/>London EC1V 4AB</> },
                ].map(d => (
                  <div className="contact-detail" key={d.label}>
                    <div className="contact-detail__icon" aria-hidden="true">{d.icon}</div>
                    <div>
                      <p className="contact-detail__label">{d.label}</p>
                      <p className="contact-detail__value">{d.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div data-reveal="up" data-delay="0.3">
                <p className="section-label" style={{marginBottom:'20px'}}>Follow the studio</p>
                <div style={{display:'flex',gap:'12px'}}>
                  {socials.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                       className="footer__social" aria-label={s.label}
                       style={{borderColor:'var(--border)',color:'var(--fg-muted)'}}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: FORM */}
            <div data-reveal="up" data-delay="0.2">
              {sent ? (
                <div className="form-success" style={{display:'block'}} role="alert">
                  Thank you for reaching out. We'll be in touch within one business day.
                </div>
              ) : (
                <form className="contact-form" onSubmit={submit} noValidate aria-label="Contact form">
                  <div className="form-group form-group--half">
                    <div className="form-group">
                      <label className="form-label" htmlFor="firstName">First name <span style={{color:'var(--accent)'}}>*</span></label>
                      <input className="form-input" id="firstName" name="firstName" type="text" placeholder="Marcus" required value={form.firstName} onChange={update} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="lastName">Last name <span style={{color:'var(--accent)'}}>*</span></label>
                      <input className="form-input" id="lastName" name="lastName" type="text" placeholder="Webb" required value={form.lastName} onChange={update} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email <span style={{color:'var(--accent)'}}>*</span></label>
                    <input className="form-input" id="email" name="email" type="email" placeholder="you@example.com" required value={form.email} onChange={update} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone (optional)</label>
                    <input className="form-input" id="phone" name="phone" type="tel" placeholder="+1 (212) 555-0100" value={form.phone} onChange={update} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="projectType">Project type</label>
                    <select className="form-select" id="projectType" name="projectType" value={form.projectType} onChange={update}>
                      <option value="" disabled>Select a category</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="cultural">Cultural / Public</option>
                      <option value="interior">Interior Design</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Other / Not sure yet</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="budget">Approximate budget</label>
                    <select className="form-select" id="budget" name="budget" value={form.budget} onChange={update}>
                      <option value="" disabled>Select a range</option>
                      <option value="under-500k">Under $500K</option>
                      <option value="500k-1m">$500K – $1M</option>
                      <option value="1m-5m">$1M – $5M</option>
                      <option value="5m-plus">$5M+</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Tell us about your project <span style={{color:'var(--accent)'}}>*</span></label>
                    <textarea className="form-textarea" id="message" name="message" placeholder="Describe your vision, the site, the timeline..." required value={form.message} onChange={update} />
                  </div>
                  <div className="form-submit">
                    <button type="submit" className="btn btn--primary" style={{width:'100%',justifyContent:'center'}}>
                      Send message
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M8 3l5 5-5 5"/></svg>
                    </button>
                  </div>
                  <p style={{fontSize:'12px',color:'var(--fg-muted)',marginTop:'12px',lineHeight:1.6}}>
                    By submitting you agree to our <Link to="/privacy" style={{color:'var(--accent)',textDecoration:'underline'}}>Privacy Policy</Link>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section className="contact-map" aria-labelledby="offices-title">
        <div className="wrap">
          <p className="section-label" data-reveal="fade">Our locations</p>
          <h2 style={{fontFamily:'var(--font-display)',fontSize:'clamp(32px,4vw,52px)',letterSpacing:'-0.03em'}} id="offices-title" data-reveal="up">
            Find<br /><em>the studio</em>
          </h2>
          <div className="offices-grid" data-stagger>
            {offices.map(o => (
              <div className="office-card" key={o.city}>
                <h3 className="office-card__city">{o.city}</h3>
                <p className="office-card__addr" style={{whiteSpace:'pre-line'}}>
                  {o.addr}<br/><br/>
                  <a href={o.href} style={{color:'var(--accent)'}}>{o.tel}</a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
