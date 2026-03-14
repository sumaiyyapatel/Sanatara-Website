import { Routes, Route, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

import Cursor   from './components/Cursor'
import Header   from './components/Header'
import Home     from './pages/Home'
import Services from './pages/Services'
import Work     from './pages/Work'
import About    from './pages/About'
import Blog     from './pages/Blog'
import Contact  from './pages/Contact'

import styles from './App.module.css'

function PageWrapper({ children }) {
  const ref = useRef(null)
  useEffect(() => {
    window.scrollTo(0, 0)
    gsap.fromTo(ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: .7, ease: 'power3.out', delay: .05 }
    )
  }, [])
  return <div ref={ref}>{children}</div>
}

export default function App() {
  const location = useLocation()
  const isHome   = location.pathname === '/'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.body.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return (
    <>
      <Cursor />
      <Header theme={theme} onToggleTheme={toggleTheme} />
      {!isHome && <InnerNav />}
      <Routes location={location} key={location.pathname}>
        <Route path="/"         element={<Home />} />
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/work"     element={<PageWrapper><Work /></PageWrapper>} />
        <Route path="/about"    element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/blog"     element={<PageWrapper><Blog /></PageWrapper>} />
        <Route path="/contact"  element={<PageWrapper><Contact /></PageWrapper>} />
      </Routes>
    </>
  )
}

function InnerNav() {
  const { pathname } = useLocation()
  const links = [
    { path: '/services', label: 'Services', deva: 'सेवाएं' },
    { path: '/work',     label: 'Work',     deva: 'काम'    },
    { path: '/about',    label: 'About',    deva: 'जान'    },
    { path: '/blog',     label: 'Journal',  deva: 'लेख'    },
    { path: '/contact',  label: 'Contact',  deva: 'संपर्क'  },
  ]
  return (
    <nav className={styles.innerNav}>
      {links.map(l => (
        <Link
          key={l.path}
          to={l.path}
          className={`${styles.innerLink} ${pathname === l.path ? styles.innerLinkActive : ''}`}
        >
          <span className={styles.innerLinkEn}>{l.label}</span>
          <span className={styles.innerLinkDeva}>{l.deva}</span>
        </Link>
      ))}
    </nav>
  )
}
