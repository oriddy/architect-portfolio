import { useState, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const sections = [
  { id: 'acceptance',    label: 'Acceptance' },
  { id: 'services',      label: 'Services' },
  { id: 'ip',            label: 'Intellectual Property' },
  { id: 'conduct',       label: 'Acceptable Use' },
  { id: 'liability',     label: 'Liability' },
  { id: 'payment',       label: 'Payment' },
  { id: 'termination',   label: 'Termination' },
  { id: 'governing',     label: 'Governing Law' },
  { id: 'changes',       label: 'Changes' },
  { id: 'contact-legal', label: 'Contact' },
]

export default function Terms() {
  useScrollReveal()
  const [active, setActive] = useState('')

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-20% 0px -70% 0px' }
    )
    sections.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <main className="legal-page" style={{paddingTop:'calc(var(--nav-h) + 48px)'}}>
      <div className="wrap">
        <nav className="legal-nav" aria-label="Terms sections">
          {sections.map(s => (
            <a key={s.id} href={`#${s.id}`} className={`legal-nav__link${active === s.id ? ' active' : ''}`}>{s.label}</a>
          ))}
        </nav>
        <article className="legal-content">
          <h1>Terms &amp; Conditions</h1>
          <p className="updated">Last updated: 1 January 2024</p>
          <p>Please read these Terms and Conditions carefully before using webbstudio.com or engaging our professional services.</p>
          <h2 id="acceptance">1. Acceptance of Terms</h2>
          <p>By accessing or using this Site, you confirm that you are at least 18 years of age and accept these Terms in full.</p>
          <h2 id="services">2. Professional Services</h2>
          <p>Webb Studio provides architectural design, interior design, urban planning, project management and consulting services. The specific scope, deliverables, fees, and timeline of any engagement are set out in a separate written Service Agreement.</p>
          <ul><li>All services are subject to the terms of the relevant Service Agreement.</li><li>Project timelines are estimates and may be subject to change.</li><li>Webb Studio shall not be liable for delays caused by third parties.</li></ul>
          <h2 id="ip">3. Intellectual Property</h2>
          <p>All content on this Site is the exclusive intellectual property of Webb Studio Architecture LLC. Unless otherwise agreed in writing, Webb Studio retains all IP rights in architectural drawings and documentation. A limited licence is granted to the client upon receipt of full payment.</p>
          <h2 id="conduct">4. Acceptable Use</h2>
          <p>You agree not to use this Site to violate any law, transmit spam, introduce malicious code, attempt unauthorised access, or collect personal data of other users.</p>
          <h2 id="liability">5. Limitation of Liability</h2>
          <p>This Site is provided "as is". To the fullest extent permitted by law, Webb Studio shall not be liable for any indirect or consequential damages arising from your use of the Site.</p>
          <h2 id="payment">6. Fees and Payment</h2>
          <p>Fees are set out in the relevant Service Agreement. Invoices are payable within 30 days. Late payments may incur interest at 1.5% per month.</p>
          <h2 id="termination">7. Termination</h2>
          <p>Either party may terminate a Service Agreement per its provisions. Webb Studio may suspend Site access at any time without notice.</p>
          <h2 id="governing">8. Governing Law</h2>
          <p>These Terms are governed by the laws of the State of New York. Disputes shall be subject to the exclusive jurisdiction of courts in New York County.</p>
          <h2 id="changes">9. Changes to These Terms</h2>
          <p>We may update these Terms at any time. Your continued use of the Site constitutes acceptance of any revised Terms.</p>
          <h2 id="contact-legal">10. Contact</h2>
          <p><strong>Webb Studio Architecture LLC</strong><br/>120 West 25th Street, New York, NY 10001<br/><a href="mailto:legal@webbstudio.com">legal@webbstudio.com</a></p>
        </article>
      </div>
    </main>
  )
}
