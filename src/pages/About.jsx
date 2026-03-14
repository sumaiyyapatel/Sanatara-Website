import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { TEAM } from '../data/content'
import s from './About.module.css'
import p from '../components/PageLayout.module.css'

export default function About() {
  const bodyRef  = useRef(null)
  const teamRef  = useRef([])

  useEffect(() => {
    gsap.from(bodyRef.current.querySelectorAll('[data-reveal]'), {
      y: 40, opacity: 0,
      stagger: .12, duration: .9,
      ease: 'power3.out', delay: .2
    })
  }, [])

  return (
    <div className={p.page} ref={bodyRef}>
      <div className={p.pageHero}>
        <div>
          <div className={p.label}>About the studio</div>
          <h1 className={p.pageTitle}>About</h1>
          <div className={p.pageTitleDeva}>जान-पहचान</div>
        </div>
        <Link to="/" className={p.backBtn}>← Back to Home</Link>
      </div>

      {/* Mission */}
      <div className={s.mission} data-reveal>
        <div className={s.missionLeft}>
          <div className={s.bigQuote}>
            "We build brands that<br /><em>endure</em> — not ones<br />that trend."
          </div>
        </div>
        <div className={s.missionRight}>
          <p data-reveal>
            Citrus Design Co. is an independent design studio based in Mumbai. 
            We work with a select number of clients each year — brands that are 
            serious about craft, serious about their audience, and serious about 
            doing things properly.
          </p>
          <p data-reveal>
            Our process is rooted in Indian design tradition — the Fibonacci 
            sequence, the mathematical beauty of Devanagari, the richness of 
            visual culture that surrounds us. We bring this into dialogue with 
            international rigour and contemporary sensibility.
          </p>
          <p data-reveal>
            No trends. No shortcuts. Just work that makes people stop.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className={s.stats} data-reveal>
        {[
          { n: '47', l: 'Projects completed' },
          { n: '12', l: 'Countries' },
          { n: '6',  l: 'Years' },
          { n: '3×', l: 'D&AD Nominated' },
        ].map(st => (
          <div key={st.n} className={s.stat}>
            <div className={s.statN}>{st.n}</div>
            <div className={s.statL}>{st.l}</div>
          </div>
        ))}
      </div>

      <div className={p.divider} />

      {/* Team */}
      <div className={s.teamSection}>
        <div className={s.teamHeader} data-reveal>
          <div className={p.label}>The people</div>
          <h2 className={s.teamTitle}>The team.</h2>
        </div>
        <div className={s.teamGrid}>
          {TEAM.map((member, i) => (
            <div key={member.name} className={s.member} ref={el => teamRef.current[i] = el} data-reveal>
              <div className={s.memberAvatar}>
                <div className={s.memberInitial}>{member.name[0]}</div>
              </div>
              <div className={s.memberInfo}>
                <div className={s.memberName}>{member.name}</div>
                <div className={s.memberRole}>{member.role}</div>
                <p className={s.memberBio}>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={p.divider} />

      {/* Values */}
      <div className={s.values}>
        <div className={s.valuesHeader} data-reveal>
          <div className={p.label}>What we believe</div>
          <h2 className={s.teamTitle}>Our values.</h2>
        </div>
        <div className={s.valueGrid}>
          {[
            { n:'01', t:'Restraint over noise', d:'The best design says exactly what needs to be said and nothing more. We resist decoration.' },
            { n:'02', t:'Depth over speed',     d:'Good work takes time. We take on fewer clients precisely so we can go deeper with each one.' },
            { n:'03', t:'Culture as craft',     d:'India has millennia of design tradition. We build with it, not despite it.' },
            { n:'04', t:'Honesty above all',    d:'We tell clients what they need to hear, not what they want to. That\'s what trusted partners do.' },
          ].map(v => (
            <div key={v.n} className={s.value} data-reveal>
              <span className={s.valueNum}>{v.n}</span>
              <div className={s.valueTitle}>{v.t}</div>
              <p className={s.valueDesc}>{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
