import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const location = useLocation()

  // RAF loop for ring
  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -100, my = -100, rx = -100, ry = -100, rafId

    const onMove = e => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'; dot.style.top = my + 'px'
    }
    const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0' }
    const onEnter = () => { dot.style.opacity = '1'; ring.style.opacity = '1' }
    const onDown  = () => ring.classList.add('clicking')
    const onUp    = () => ring.classList.remove('clicking')

    function animate() {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
      rafId = requestAnimationFrame(animate)
    }
    animate()

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
    }
  }, [])

  // Re-attach hover listeners after each route change
  useEffect(() => {
    const ring = ringRef.current
    if (!ring) return
    const add    = () => ring.classList.add('hovered')
    const remove = () => ring.classList.remove('hovered')
    const els = document.querySelectorAll('a, button, input, textarea, select')
    els.forEach(el => { el.addEventListener('mouseenter', add); el.addEventListener('mouseleave', remove) })
    return () => els.forEach(el => { el.removeEventListener('mouseenter', add); el.removeEventListener('mouseleave', remove) })
  }, [location.pathname])

  return (
    <>
      <div className="cursor-dot"  ref={dotRef}  />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}
