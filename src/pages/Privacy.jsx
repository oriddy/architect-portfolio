import { useState, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const sections = [
  { id: 'overview',     label: 'Overview' },
  { id: 'collection',   label: 'Data We Collect' },
  { id: 'how-we-use',   label: 'How We Use It' },
  { id: 'sharing',      label: 'Sharing Data' },
  { id: 'cookies',      label: 'Cookies' },
  { id: 'retention',    label: 'Retention' },
  { id: 'security',     label: 'Security' },
  { id: 'rights',       label: 'Your Rights' },
  { id: 'children',     label: 'Children' },
  { id: 'transfers',    label: 'International' },
  { id: 'changes-priv', label: 'Changes' },
  { id: 'contact-priv', label: 'Contact' },
]

export default function Privacy() {
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
        <nav className="legal-nav" aria-label="Privacy policy sections">
          {sections.map(s => (
            <a key={s.id} href={`#${s.id}`} className={`legal-nav__link${active === s.id ? ' active' : ''}`}>{s.label}</a>
          ))}
        </nav>
        <article className="legal-content">
          <h1>Privacy Policy</h1>
          <p className="updated">Last updated: 1 January 2024</p>
          <p>Webb Studio Architecture LLC is committed to protecting your privacy. This Policy explains how we collect, use, and safeguard your personal information.</p>
          <h2 id="overview">1. Overview</h2>
          <p>We collect only the information necessary to provide you with an excellent experience. We do not sell personal data to third parties.</p>
          <h2 id="collection">2. Information We Collect</h2>
          <ul>
            <li><strong>Contact information:</strong> name, email, phone, postal address.</li>
            <li><strong>Project information:</strong> details about your project, budget, and preferences.</li>
            <li><strong>Communications:</strong> records of correspondence and emails.</li>
            <li><strong>Technical data:</strong> IP address, browser type, pages visited — collected via cookies and analytics.</li>
          </ul>
          <h2 id="how-we-use">3. How We Use Your Information</h2>
          <ul>
            <li>To respond to enquiries and provide professional services.</li>
            <li>To manage our business relationship with you.</li>
            <li>To process payments and maintain financial records.</li>
            <li>To improve the Site's content and user experience.</li>
            <li>To comply with applicable legal obligations.</li>
          </ul>
          <h2 id="sharing">4. How We Share Your Information</h2>
          <p>We do not sell, rent or trade your personal information. We may share it with service providers, professional collaborators, or as required by law.</p>
          <h2 id="cookies">5. Cookies and Tracking Technologies</h2>
          <p>We use essential cookies, analytics cookies (e.g. Google Analytics), and preference cookies. You can control cookies through your browser settings.</p>
          <h2 id="retention">6. Data Retention</h2>
          <p>Client project records are retained for 7 years after project completion. Enquiry data for non-clients is retained for up to 2 years.</p>
          <h2 id="security">7. Security</h2>
          <p>We implement appropriate technical and organisational security measures including encrypted transmission via HTTPS/TLS and access controls.</p>
          <h2 id="rights">8. Your Rights</h2>
          <p>Depending on your jurisdiction, you may request access, correction, erasure, restriction, portability, or object to processing. Contact us at <a href="mailto:privacy@webbstudio.com">privacy@webbstudio.com</a>.</p>
          <h2 id="children">9. Children's Privacy</h2>
          <p>Our Site is not directed to children under 16. We do not knowingly collect information from children.</p>
          <h2 id="transfers">10. International Data Transfers</h2>
          <p>Webb Studio operates from offices in the US, UK and Japan. Where data is transferred internationally, we ensure appropriate safeguards are in place.</p>
          <h2 id="changes-priv">11. Changes to This Policy</h2>
          <p>We may update this Policy from time to time. Your continued use of the Site after changes constitutes acceptance.</p>
          <h2 id="contact-priv">12. Contact &amp; Data Controller</h2>
          <p><strong>Webb Studio Architecture LLC</strong><br/>120 West 25th Street, New York, NY 10001<br/><a href="mailto:privacy@webbstudio.com">privacy@webbstudio.com</a></p>
        </article>
      </div>
    </main>
  )
}
