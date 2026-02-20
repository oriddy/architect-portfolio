import { useEffect } from 'react'

function animateCounter(el) {
  const target = parseFloat(el.dataset.count)
  const suffix = el.dataset.suffix || ''
  const duration = 1800
  const start = performance.now()
  function update(now) {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = Math.round(eased * target * 10) / 10
    el.textContent = (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix
    if (progress < 1) requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}

export function useCounter() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )
    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
