import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SERVICES } from '../data/content'
import styles from './Home.module.css'

gsap.registerPlugin(ScrollTrigger)

const PROPS = {
  d: {
    1:{w:704,h:704,t:0,  l:0  }, 2:{w:440,h:440,t:0,  l:704},
    3:{w:264,h:264,t:440,l:880}, 4:{w:176,h:176,t:528,l:704},
    5:{w:88, h:88, t:440,l:704}, 6:{w:88, h:88, t:440,l:792},
  },
  m: {
    1:{w:704,h:704,t:0,  l:0  }, 2:{w:440,h:440,t:704,l:264},
    3:{w:264,h:264,t:880,l:0  }, 4:{w:176,h:176,t:704,l:0  },
    5:{w:88, h:88, t:704,l:176}, 6:{w:88, h:88, t:792,l:176},
  }
}

const isDesktop = () => window.innerWidth >= 1200
const getProps  = id => (isDesktop() ? PROPS.d : PROPS.m)[id]
const getCenter = ()  => isDesktop() ? {w:1144,h:704} : {w:704,h:1144}

export default function Home() {
  const navigate    = useNavigate()
  const gridRef     = useRef(null)
  const contentRef  = useRef(null)
  const hintRef     = useRef(null)
  const vpCoverRef  = useRef(null)
  const introRef    = useRef(null)
  const scrollRef   = useRef(null) // the 300vh scroll canvas
  const stRef       = useRef([])
  const moveRef     = useRef(null)

  const tileRefs = useRef({ g: {}, c: {} })

  useEffect(() => {
    const grid    = gridRef.current
    const content = contentRef.current
    const hint    = hintRef.current
    const vpCover = vpCoverRef.current
    const intro   = introRef.current

    function init() {
      stRef.current.forEach(st => st.kill())
      stRef.current = []
      if (moveRef.current) window.removeEventListener('mousemove', moveRef.current)

      const C  = getCenter()
      const cx = C.w / 2
      const cy = C.h / 2

      gsap.set(vpCover, { opacity: 1 })
      gsap.set(intro,   { opacity: 1 })

      // UI/UX tile (id=5) starts huge + centred
      const uiG = tileRefs.current.g[5]
      const uiC = tileRefs.current.c[5]
      gsap.set([uiG, uiC], {
        scale: 10,
        xPercent: -50, yPercent: -50,
        top: '50%', left: '50%',
        transformOrigin: 'center center',
      })

      // Others scattered
      ;[1,2,3,4,6].forEach(id => {
        const tp = getProps(id)
        const dx = (tp.l + tp.w/2) - cx
        const dy = (tp.t + tp.h/2) - cy
        gsap.set([tileRefs.current.g[id], tileRefs.current.c[id]], {
          x: dx*4, y: dy*4,
          transformOrigin: 'center center'
        })
      })

      const finalPos = isDesktop()
        ? { top:'440px', left:'704px' }
        : { top:'704px', left:'176px' }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollRef.current,
          start: 'top top',
          end:   'bottom bottom',
          scrub: 1.2,
          onUpdate: s => {
            if (s.progress > 0.04) hint.classList.add(styles.hintHidden)
            else hint.classList.remove(styles.hintHidden)
          }
        }
      })

      // Intro fill fades
      tl.to(intro, { opacity: 0, ease: 'power1.in', duration: 0.25 }, 0)

      // UI/UX shrinks home
      tl.to([uiG, uiC], {
        scale: 1, top: finalPos.top, left: finalPos.left,
        xPercent: 0, yPercent: 0,
        ease: 'power2.inOut', duration: 0.6,
      }, 0)

      // Others fly home
      const otherEls = [1,2,3,4,6].flatMap(id => [
        tileRefs.current.g[id],
        tileRefs.current.c[id]
      ])
      tl.to(otherEls, { x: 0, y: 0, ease: 'power3.out', duration: 0.8 }, 0.2)

      // Gap collapse
      tl.to([grid, content], { '--gap': '0px', ease: 'power2.inOut', duration: 2 }, 0)

      // Cover fades
      tl.to(vpCover, { opacity: 0, ease: 'none', duration: 0.4 }, 0.5)

      stRef.current = ScrollTrigger.getAll()

      // Mouse parallax
      const onMove = e => {
        const nx = e.clientX / window.innerWidth  - 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        const q1 = content.querySelector('[data-tile="1"] .tile-quote')
        const r1 = content.querySelector('[data-tile="1"] .tile-roman')
        const r2 = content.querySelector('[data-tile="2"] .tile-roman')
        const r3 = content.querySelector('[data-tile="3"] .tile-roman')
        if (q1) gsap.to(q1, { x: nx*-10, y: ny*-7, duration:1.5, ease:'power2.out' })
        if (r1) gsap.to(r1, { x: nx*-5,  y: ny*-3, duration:1.7, ease:'power2.out' })
        if (r2) gsap.to(r2, { x: nx*8,   y: ny*6,  duration:1.4, ease:'power2.out' })
        if (r3) gsap.to(r3, { x: nx*-6,  y: ny*4,  duration:1.6, ease:'power2.out' })
      }
      moveRef.current = onMove
      window.addEventListener('mousemove', onMove)
    }

    init()

    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(init, 260)
    }
    window.addEventListener('resize', onResize)

    return () => {
      stRef.current.forEach(st => st.kill())
      if (moveRef.current) window.removeEventListener('mousemove', moveRef.current)
      window.removeEventListener('resize', onResize)
      document.body.classList.remove('tile-hover')
    }
  }, [])

  const setGRef = (id, el) => { tileRefs.current.g[id] = el }
  const setCRef = (id, el) => { tileRefs.current.c[id] = el }

  const onTileEnter = () => document.body.classList.add('tile-hover')
  const onTileLeave = () => document.body.classList.remove('tile-hover')
  const go = path => navigate(path)

  return (
    <div className={styles.scrollCanvas} ref={scrollRef}>

      {/* ── Viewport cover ── */}
      <div ref={vpCoverRef} className={styles.vpCover} />
      {/* ── Intro full-screen fill ── */}
      <div ref={introRef}   className={styles.introFill} />

      {/* ── GRID LAYER (backgrounds + lines) ── */}
      <div className={`${styles.layer} ${styles.gridLayer}`} ref={gridRef}>
        {[1,2,3,4,5,6].map(id => (
          <div
            key={id}
            ref={el => setGRef(id, el)}
            className={`${styles.gridTile} ${styles[`gt${id}`]}`}
          >
            <div className={styles.tileLines} />
          </div>
        ))}
      </div>

      {/* ── CONTENT LAYER (interactive) ── */}
      <div className={`${styles.layer} ${styles.contentLayer}`} ref={contentRef}>

        {/* TILE 1 — SERVICES */}
        <div
          ref={el => setCRef(1, el)}
          data-tile="1"
          className={`${styles.tileContainer} ${styles.tc1}`}
          onMouseEnter={onTileEnter}
          onMouseLeave={onTileLeave}
          onClick={() => go('/services')}
        >
          <div className={`${styles.tileBg} ${styles.bg1}`} />
          <div className={`${styles.tileWipe} ${styles.wipe1}`} />
          <div className={styles.tileArrow}>↗</div>
          <div className={styles.tileInner}>
            <div>
              <p className="tile-quote" style={{
                fontFamily:'"DM Sans",sans-serif', fontSize:'.7rem',
                fontStyle:'italic', fontWeight:300, lineHeight:1.65,
                color:'rgba(237,246,217,.25)', maxWidth:230,
                transition:'color .45s'
              }}>
                "Design is not how it looks — it's how it works and what it means."
              </p>
              <div style={{ marginTop:18 }}>
                <div className={`tile-roman ${styles.roman1}`}>SERVICES</div>
                <div className={`tile-deva  ${styles.deva1}`}>सेवाएं</div>
              </div>
            </div>
            <div className={styles.svcList}>
              {SERVICES.map(s => (
                <div key={s.num} className={styles.svcRow}>
                  <span>{s.en}</span>
                  <span className={styles.svcNum}>{s.num}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TILE 2 — WORK */}
        <div
          ref={el => setCRef(2, el)}
          data-tile="2"
          className={`${styles.tileContainer} ${styles.tc2}`}
          onMouseEnter={onTileEnter}
          onMouseLeave={onTileLeave}
          onClick={() => go('/work')}
        >
          <div className={`${styles.tileBg} ${styles.bg2}`} />
          <div className={`${styles.tileWipe} ${styles.wipe2}`} />
          <div className={styles.tileArrow}>↗</div>
          <div className={styles.workBadge}>47 Projects</div>
          <div className={styles.tileInner} style={{ justifyContent:'flex-end', alignItems:'flex-end' }}>
            <div className={`tile-roman ${styles.roman2}`}>WORK</div>
            <div className={`tile-deva  ${styles.deva2}`}>काम काज</div>
          </div>
        </div>

        {/* TILE 3 — CONTACT */}
        <div
          ref={el => setCRef(3, el)}
          data-tile="3"
          className={`${styles.tileContainer} ${styles.tc3}`}
          onMouseEnter={onTileEnter}
          onMouseLeave={onTileLeave}
          onClick={() => go('/contact')}
        >
          <div className={`${styles.tileBg} ${styles.bg3}`} />
          <div className={`${styles.tileWipe} ${styles.wipe3}`} />
          <div className={styles.tileArrow}>↗</div>
          <div className={styles.tileInner} style={{ justifyContent:'flex-end', alignItems:'flex-end' }}>
            <div className={`tile-deva  ${styles.deva3}`}>संपर्क</div>
            <div className={`tile-roman ${styles.roman3}`}>CONTACT</div>
          </div>
        </div>

        {/* TILE 4 — ABOUT */}
        <div
          ref={el => setCRef(4, el)}
          data-tile="4"
          className={`${styles.tileContainer} ${styles.tc4}`}
          onMouseEnter={onTileEnter}
          onMouseLeave={onTileLeave}
          onClick={() => go('/about')}
        >
          <div className={`${styles.tileBg} ${styles.bg4}`} />
          <div className={`${styles.tileWipe} ${styles.wipe4}`} />
          <div className={styles.tileArrow} style={{ fontSize:'.85rem' }}>↗</div>
          <div className={styles.tileInner} style={{ justifyContent:'flex-end', alignItems:'flex-start', padding:'12% 10%' }}>
            <div className={`tile-deva  ${styles.deva4}`}>जान-पहचान</div>
            <div className={`tile-roman ${styles.roman4}`}>ABOUT</div>
          </div>
        </div>

        {/* TILE 5 — UI/UX (origin tile) */}
        <div
          ref={el => setCRef(5, el)}
          data-tile="5"
          className={`${styles.tileContainer} ${styles.tc5}`}
          onMouseEnter={onTileEnter}
          onMouseLeave={onTileLeave}
        >
          <div className={`${styles.tileBg} ${styles.bg5}`} />
          <div className={`${styles.tileWipe} ${styles.wipe5}`} />
          <div className={styles.tileInner} style={{ justifyContent:'center', alignItems:'center', padding:0 }}>
            <div className={`tile-roman ${styles.roman5}`}>UI</div>
            <div className={`tile-deva  ${styles.deva5}`}>UX</div>
          </div>
        </div>

        {/* TILE 6 — BLOGS */}
        <div
          ref={el => setCRef(6, el)}
          data-tile="6"
          className={`${styles.tileContainer} ${styles.tc6}`}
          onMouseEnter={onTileEnter}
          onMouseLeave={onTileLeave}
          onClick={() => go('/blog')}
        >
          <div className={`${styles.tileBg} ${styles.bg6}`} />
          <div className={`${styles.tileWipe} ${styles.wipe6}`} />
          <div className={styles.tileInner} style={{ justifyContent:'center', alignItems:'center', padding:0 }}>
            <div className={`tile-deva  ${styles.deva6}`}>लेख</div>
            <div className={`tile-roman ${styles.roman6}`}>BLOGS</div>
          </div>
        </div>

      </div>

      {/* ── Scroll hint ── */}
      <div ref={hintRef} className={styles.scrollHint}>
        <span className={styles.shLabel}>Scroll</span>
        <div className={styles.shTrack}><div className={styles.shFill} /></div>
      </div>

    </div>
  )
}
