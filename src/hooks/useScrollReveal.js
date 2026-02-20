import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = parseFloat(entry.target.dataset.delay || 0) * 1000
            setTimeout(() => entry.target.classList.add('revealed'), delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll('[data-reveal], [data-stagger], .img-wrap')
      .forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
