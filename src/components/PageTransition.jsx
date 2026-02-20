import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageTransition() {
  const ref = useRef(null)
  const location = useLocation()
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'none'
    el.style.transform = 'scaleY(1)'
    el.style.transformOrigin = 'top'
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transition = 'transform 0.55s cubic-bezier(0.77,0,0.18,1)'
      el.style.transform = 'scaleY(0)'
    }))
  }, [location.pathname])
  return <div className="page-transition" ref={ref} />
}
