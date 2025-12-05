import { Bell, TextAlignStart, AtSign, Sun, Moon } from 'lucide-react';
import React, { useCallback, useContext, useEffect, useId, useRef } from 'react';
import { ThemeContext } from '../../components/theme-context.ts';

/**
 * Barra superior de la aplicación.
 * - En móvil: el botón de menú abre el Drawer (Sidebar).
 * - En escritorio: el botón de menú despliega un popover accesible.
 */
interface NavbarProps {
  onMenuClick: () => void
  menuOpen: boolean
}

const ThemeToggle = React.memo(function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext)
  const isDark = theme === 'dark'
  const handleToggle = useCallback(() => {
    setTheme(isDark ? 'light' : 'dark')
  }, [isDark, setTheme])
  return (
    <button
      type="button"
      className={`theme-toggle ${isDark ? 'is-dark' : 'is-light'}`}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      aria-pressed={isDark}
      onClick={handleToggle}
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb" />
        <span className="theme-toggle-icon">
          {isDark ? <Moon size={16} /> : <Sun size={16} />}
        </span>
      </span>
    </button>
  )
})

export function Navbar({ onMenuClick, menuOpen }: NavbarProps) {
  const popId = useId()
  const userPopoverId = `user-menu-${popId}`
  const userBtnRef = useRef<HTMLButtonElement>(null)
  const userPopRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pop = userPopRef.current
    const btn = userBtnRef.current
    if (!pop || !btn) return

    const updatePosition = () => {
      const rect = btn.getBoundingClientRect()
      const vw = window.innerWidth
      const desired = Math.max(rect.width, 240)
      const maxW = Math.max(160, vw - 20)
      const width = Math.min(desired, maxW)
      const maxRight = vw - 10
      let left = rect.left
      if (left + width > maxRight) {
        left = Math.max(10, maxRight - width)
      }
      pop.style.top = `${rect.bottom + 6}px`
      pop.style.left = `${left}px`
      pop.style.width = `${width}px`
      pop.style.maxWidth = `calc(100vw - 20px)`
    }

    const handleToggle = (event: Event) => {
      const e = event as ToggleEvent
      if (e.newState === 'open') {
        updatePosition()
        window.addEventListener('resize', updatePosition)
        window.addEventListener('scroll', updatePosition, { capture: true })
      } else {
        window.removeEventListener('resize', updatePosition)
        window.removeEventListener('scroll', updatePosition, { capture: true })
      }
    }

    pop.addEventListener('toggle', handleToggle)
    return () => {
      pop.removeEventListener('toggle', handleToggle)
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, { capture: true })
    }
  }, [])

  return (
    <header className="navbar" role="banner">
      <button
        className={`navbar-icon-btn navbar-menu-btn ${menuOpen ? "is-active" : ""}`}
        aria-label="Menú"
        aria-pressed={menuOpen}
        onClick={onMenuClick}
      >
        <TextAlignStart size={20} />
      </button>

      <div className="navbar-brand">
        <div className="navbar-logo">
          <AtSign size={24} />
        </div>
        <h1 className="navbar-title">Biométricos</h1>
      </div>


      <div className="navbar-content">

        <nav className="navbar-actions" aria-label="Acciones">
          <button
            className="navbar-icon-btn"
            aria-label="Notificaciones (2 nuevas)"
          >
            <Bell size={20} />
            <span className="navbar-icon-badge" aria-hidden="true">2</span>
          </button>
          <div className="navbar-user" aria-label="Usuario actual">
            <div className="navbar-user-text" role="text">
              <span className="user-first">Javier</span>
              <span className="user-last">Estorquem</span>
            </div>

            <button
              type="button"
              id={`${userPopoverId}-btn`}
              className="navbar-avatar"
              aria-haspopup="menu"
              aria-controls={userPopoverId}
              popoverTarget={userPopoverId}
              ref={userBtnRef}
            >
              JE
            </button>

            <div
              id={userPopoverId}
              className="user-menu-popover"
              role="menu"
              aria-label="Menú de usuario"
              popover="auto"
              ref={userPopRef}
            >
              <div className="user-menu-header">
                <span className="user-menu-name">Javier Estorquem</span>
              </div>
              <div className="user-menu-divider" />
              <div className="user-menu-item" role="menuitem">
                <span className="user-menu-item-label">Tema</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
