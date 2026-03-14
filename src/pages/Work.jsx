import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { WORK } from '../data/content'
import s from './Work.module.css'
import p from '../components/PageLayout.module.css'

const FILTERS = ['All', 'Branding', 'UI/UX', 'Motion', 'Strategy']

export default function Work() {
  const [active, setActive] = useState('All')
  const cardsRef = useRef([])

  useEffect(() => {
    gsap.from(cardsRef.current.filter(Boolean), {
      y: 60, opacity: 0,
      stagger: .1, duration: .9,
      ease: 'power3.out', delay: .2
    })
  }, [])

  const filtered = active === 'All'
    ? WORK
    : WORK.filter(w => w.tags.some(t => t.includes(active)))

  return (
    <div className={p.page}>
      <div className={p.pageHero}>
        <div>
          <div className={p.label}>Selected Work</div>
          <h1 className={p.pageTitle}>Work</h1>
          <div className={p.pageTitleDeva}>काम काज</div>
        </div>
        <Link to="/" className={p.backBtn}>← Back to Home</Link>
      </div>

      <div className={s.filters}>
        {FILTERS.map(f => (
          <button
            key={f}
            className={`${s.filter} ${active === f ? s.filterActive : ''}`}
            onClick={() => setActive(f)}
          >{f}</button>
        ))}
      </div>

      <div className={s.grid}>
        {filtered.map((w, i) => (
          <div
            key={w.id}
            ref={el => cardsRef.current[i] = el}
            className={s.card}
          >
            <div className={s.cardVisual} style={{ background: w.color }}>
              <div className={s.cardOverlayNum} style={{ color: w.accent }}>
                {String(w.id).padStart(2, '0')}
              </div>
              <div className={s.cardHover}>
                <div className={s.cardHoverText}>View Project</div>
              </div>
            </div>
            <div className={s.cardMeta}>
              <div className={s.cardCategory}>{w.category}</div>
              <div className={s.cardTitle}>{w.title}</div>
              <p className={s.cardDesc}>{w.desc}</p>
              <div className={s.cardFooter}>
                <div className={s.tags}>
                  {w.tags.map(t => (
                    <span key={t} className={s.tag}>{t}</span>
                  ))}
                </div>
                <span className={s.year}>{w.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
