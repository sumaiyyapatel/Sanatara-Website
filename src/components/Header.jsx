import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header({ theme, onToggleTheme }) {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>Citrus</Link>
      <div className={styles.controls}>
        <span className={styles.tag}>Design Co. — Est. 2021</span>
        <button
          type="button"
          className={styles.themeBtn}
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </div>
    </header>
  )
}
