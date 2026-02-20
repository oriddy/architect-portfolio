import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import About from './pages/About'
import Contact from './pages/Contact'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'

export default function App() {
  const location = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <PageTransition />
      <Nav />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about"    element={<About />} />
        <Route path="/contact"  element={<Contact />} />
        <Route path="/terms"    element={<Terms />} />
        <Route path="/privacy"  element={<Privacy />} />
      </Routes>
      <Footer />
    </>
  )
}
