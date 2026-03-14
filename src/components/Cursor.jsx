import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './Cursor.module.css'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    let mx=0, my=0, rx=0, ry=0

    const onMove = e => {
      mx = e.clientX; my = e.clientY
      gsap.set(dot, { x: mx, y: my })
    }

    const tick = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      gsap.set(ring, { x: rx, y: ry })
    }

    window.addEventListener('mousemove', onMove)
    gsap.ticker.add(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className={styles.dot}  />
      <div ref={ringRef} className={styles.ring} />
    </>
  )
}
