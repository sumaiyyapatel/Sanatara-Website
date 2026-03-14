import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import s from './Contact.module.css'
import p from '../components/PageLayout.module.css'

export default function Contact() {
  const [form, setForm]     = useState({ name:'', company:'', email:'', budget:'', message:'' })
  const [sent, setSent]     = useState(false)
  const formRef = useRef(null)
  const magRef  = useRef(null)

  useEffect(() => {
    gsap.from(formRef.current.querySelectorAll('[data-reveal]'), {
      y: 30, opacity: 0,
      stagger: .1, duration: .8,
      ease: 'power3.out', delay: .2
    })

    // Magnetic submit button
    const btn = magRef.current
    const onMove = e => {
      const r  = btn.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width/2)
      const dy = e.clientY - (r.top  + r.height/2)
      gsap.to(btn, { x: dx*.3, y: dy*.3, duration:.4, ease:'power2.out' })
    }
    const onLeave = () => gsap.to(btn, { x:0, y:0, duration:.6, ease:'elastic.out(1,.4)' })
    btn.addEventListener('mousemove', onMove)
    btn.addEventListener('mouseleave', onLeave)
    return () => {
      btn.removeEventListener('mousemove', onMove)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = e => { e.preventDefault(); setSent(true) }

  return (
    <div className={p.page}>
      <div className={p.pageHero}>
        <div>
          <div className={p.label}>Get in touch</div>
          <h1 className={p.pageTitle}>Contact</h1>
          <div className={p.pageTitleDeva}>संपर्क</div>
        </div>
        <Link to="/" className={p.backBtn}>← Back to Home</Link>
      </div>

      <div className={s.layout} ref={formRef}>

        {/* Left — form */}
        <div className={s.formSide}>
          {sent ? (
            <div className={s.sent} data-reveal>
              <div className={s.sentIcon}>✓</div>
              <h3 className={s.sentTitle}>Message received.</h3>
              <p className={s.sentDesc}>We'll be in touch within 48 hours. Good things take a little time.</p>
            </div>
          ) : (
            <form className={s.form} onSubmit={handleSubmit}>
              <div className={s.formRow} data-reveal>
                <div className={s.field}>
                  <label className={s.label}>Your Name</label>
                  <input
                    name="name" value={form.name} onChange={handleChange}
                    className={s.input} placeholder="Aarav Mehta" required
                  />
                </div>
                <div className={s.field}>
                  <label className={s.label}>Company</label>
                  <input
                    name="company" value={form.company} onChange={handleChange}
                    className={s.input} placeholder="Your studio / brand"
                  />
                </div>
              </div>
              <div className={s.field} data-reveal>
                <label className={s.label}>Email</label>
                <input
                  name="email" type="email" value={form.email} onChange={handleChange}
                  className={s.input} placeholder="hello@yourbrand.com" required
                />
              </div>
              <div className={s.field} data-reveal>
                <label className={s.label}>Approximate Budget</label>
                <select name="budget" value={form.budget} onChange={handleChange} className={s.select}>
                  <option value="">Select a range</option>
                  <option>₹5L – ₹10L</option>
                  <option>₹10L – ₹25L</option>
                  <option>₹25L – ₹50L</option>
                  <option>₹50L+</option>
                  <option>Let's discuss</option>
                </select>
              </div>
              <div className={s.field} data-reveal>
                <label className={s.label}>Tell us about your project</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  className={s.textarea}
                  placeholder="What are you building? What's the challenge? What does success look like?"
                  rows={6} required
                />
              </div>
              <div data-reveal>
                <button ref={magRef} type="submit" className={s.submit}>
                  <span>Send Message</span>
                  <span className={s.submitArrow}>↗</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right — info */}
        <div className={s.infoSide}>
          <div className={s.infoBlock} data-reveal>
            <div className={s.infoLabel}>Email</div>
            <a href="mailto:hello@citrus.design" className={s.infoVal}>
              hello@citrus.design
            </a>
          </div>
          <div className={s.infoBlock} data-reveal>
            <div className={s.infoLabel}>Based in</div>
            <div className={s.infoVal}>Mumbai, India</div>
          </div>
          <div className={s.infoBlock} data-reveal>
            <div className={s.infoLabel}>New projects</div>
            <div className={s.infoVal} style={{ color:'var(--orange)' }}>Accepting 2025</div>
          </div>
          <div className={s.infoBlock} data-reveal>
            <div className={s.infoLabel}>Response time</div>
            <div className={s.infoVal}>Within 48 hours</div>
          </div>
          <div className={s.socials} data-reveal>
            <div className={s.infoLabel} style={{ marginBottom:16 }}>Follow the work</div>
            {['Instagram', 'LinkedIn', 'Behance', 'Dribbble'].map(soc => (
              <a key={soc} href="#" className={s.socialLink}>
                {soc} ↗
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
