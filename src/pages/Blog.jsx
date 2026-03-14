import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { BLOG_POSTS } from '../data/content'
import s from './Blog.module.css'
import p from '../components/PageLayout.module.css'

export default function Blog() {
  const listRef = useRef([])

  useEffect(() => {
    gsap.from(listRef.current.filter(Boolean), {
      y: 32, opacity: 0,
      stagger: .1, duration: .8,
      ease: 'power3.out', delay: .2
    })
  }, [])

  return (
    <div className={p.page}>
      <div className={p.pageHero}>
        <div>
          <div className={p.label}>Thinking out loud</div>
          <h1 className={p.pageTitle}>Journal</h1>
          <div className={p.pageTitleDeva}>लेख</div>
        </div>
        <Link to="/" className={p.backBtn}>← Back to Home</Link>
      </div>

      {/* Featured */}
      <div className={s.featured} ref={el => listRef.current[0] = el}>
        <div className={s.featuredMeta}>
          <span className={s.featCat}>{BLOG_POSTS[0].category}</span>
          <span className={s.featDate}>{BLOG_POSTS[0].date}</span>
          <span className={s.featRead}>{BLOG_POSTS[0].read}</span>
        </div>
        <h2 className={s.featTitle}>{BLOG_POSTS[0].title}</h2>
        <p className={s.featExcerpt}>{BLOG_POSTS[0].excerpt}</p>
        <button className={s.readBtn}>Read Article ↗</button>
      </div>

      <div className={p.divider} />

      {/* List */}
      <div className={s.list}>
        {BLOG_POSTS.slice(1).map((post, i) => (
          <div
            key={post.id}
            ref={el => listRef.current[i + 1] = el}
            className={s.postRow}
          >
            <div className={s.postLeft}>
              <span className={s.postCat}>{post.category}</span>
              <h3 className={s.postTitle}>{post.title}</h3>
              <p className={s.postExcerpt}>{post.excerpt}</p>
            </div>
            <div className={s.postRight}>
              <span className={s.postDate}>{post.date}</span>
              <span className={s.postRead}>{post.read}</span>
              <div className={s.postArrow}>↗</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
