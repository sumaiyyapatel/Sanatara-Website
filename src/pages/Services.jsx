import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { SERVICES } from '../data/content'
import s from './Services.module.css'
import p from '../components/PageLayout.module.css'

const DETAIL = [
  {
    num: '01', en: 'Brand Identity', hi: 'ब्रांड पहचान',
    desc: 'Complete visual identity systems — logomark, type, colour, motion, guidelines. Built to endure and to flex across every context your brand needs to occupy.',
    deliverables: ['Logo & Mark System', 'Typography Selection', 'Colour Architecture', 'Brand Guidelines', 'Application Design'],
  },
  {
    num: '02', en: 'UI / UX Design', hi: 'यूआई / यूएक्स',
    desc: 'Digital products and interfaces that balance beauty with function. We design with rigour — research, wireframes, prototypes — and an uncompromising aesthetic.',
    deliverables: ['User Research', 'Information Architecture', 'Wireframing', 'UI Design', 'Prototype & Handoff'],
  },
  {
    num: '03', en: 'Motion & Animation', hi: 'गति कला',
    desc: 'Brand films, animated identities, UI micro-interactions. Motion is meaning — every frame is intentional.',
    deliverables: ['Brand Films', 'Animated Identity', 'UI Motion', 'Social Content', 'Explainer Videos'],
  },
  {
    num: '04', en: 'Web Development', hi: 'वेब विकास',
    desc: 'We build what we design. High-performance, beautifully crafted websites and web applications using modern technologies.',
    deliverables: ['React / Next.js', 'CMS Integration', 'E-commerce', 'Performance Optimisation', 'Accessibility'],
  },
  {
    num: '05', en: 'Print & Editorial', hi: 'मुद्रण',
    desc: 'Print is not dead — it\'s just rare. When it\'s done well, it\'s the most powerful brand touchpoint of all. Annual reports, books, packaging, OOH.',
    deliverables: ['Annual Reports', 'Brand Books', 'Packaging', 'OOH Campaign', 'Editorial Design'],
  },
  {
    num: '06', en: 'Strategy & Direction', hi: 'रणनीति',
    desc: 'The thinking before the making. Brand positioning, narrative architecture, naming, and campaign strategy that gives everything else its meaning.',
    deliverables: ['Brand Positioning', 'Naming', 'Campaign Strategy', 'Audience Research', 'Brand Narrative'],
  },
]

export default function Services() {
  const itemsRef = useRef([])

  useEffect(() => {
    gsap.from(itemsRef.current, {
      y: 40, opacity: 0,
      stagger: .1, duration: .8,
      ease: 'power3.out', delay: .2
    })
  }, [])

  return (
    <div className={p.page}>
      <div className={p.pageHero}>
        <div>
          <div className={p.label}>What we do</div>
          <h1 className={p.pageTitle}>Services</h1>
          <div className={p.pageTitleDeva}>सेवाएं</div>
        </div>
        <Link to="/" className={p.backBtn}>← Back to Home</Link>
      </div>

      <div className={s.grid}>
        {DETAIL.map((svc, i) => (
          <div
            key={svc.num}
            ref={el => itemsRef.current[i] = el}
            className={s.card}
          >
            <div className={s.cardTop}>
              <span className={s.cardNum}>{svc.num}</span>
              <span className={s.cardArrow}>↗</span>
            </div>
            <div className={s.cardTitle}>{svc.en}</div>
            <div className={s.cardDeva}>{svc.hi}</div>
            <p className={s.cardDesc}>{svc.desc}</p>
            <ul className={s.deliverables}>
              {svc.deliverables.map(d => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={s.cta}>
        <div className={s.ctaInner}>
          <div className={p.label}>Ready to begin?</div>
          <h2 className={s.ctaTitle}>Let's build something<br /><em>worth caring about.</em></h2>
          <Link to="/contact" className={s.ctaBtn}>Start a project ↗</Link>
        </div>
      </div>
    </div>
  )
}
