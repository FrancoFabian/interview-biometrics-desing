import { Bell, TextAlignStart, AtSign } from 'lucide-react';
import { useId } from 'react';
import styles from './Navbar.module.css';

// Extracted components and hooks
import { ThemeToggle } from '../../ui/ThemeToggle/ThemeToggle';
import { usePopoverPosition } from '../../../hooks/usePopoverPosition';

/**
 * Barra superior de la aplicación.
 * - En móvil: el botón de menú abre el Drawer (Sidebar).
 * - En escritorio: el botón de menú despliega un popover accesible.
 */
interface NavbarProps {
    onMenuClick: () => void
    menuOpen: boolean
}

export function Navbar({ onMenuClick, menuOpen }: NavbarProps) {
    const popId = useId()
    const userPopoverId = `user-menu-${popId}`

    // Use shared popover positioning hook
    const { triggerRef: userBtnRef, popoverRef: userPopRef } = usePopoverPosition({
        minWidth: 240,
        offsetY: 6,
    });

    return (
        <header className={styles.navbar} role="banner">
            <button
                className={`${styles.iconBtn} ${styles.menuBtn} ${menuOpen ? styles.isActive : ""}`}
                aria-label="Menú"
                aria-pressed={menuOpen}
                onClick={onMenuClick}
            >
                <TextAlignStart size={20} />
            </button>

            <div className={styles.brand}>
                <div className={styles.logo}>
                    <AtSign size={24} />
                </div>
                <h1 className={styles.title}>Biométricos</h1>
            </div>


            <div className={styles.content}>

                <nav className={styles.actions} aria-label="Acciones">
                    <button
                        className={styles.iconBtn}
                        aria-label="Notificaciones (2 nuevas)"
                    >
                        <Bell size={20} />
                        <span className={styles.iconBadge} aria-hidden="true">2</span>
                    </button>
                    <div className={styles.user} aria-label="Usuario actual">
                        <div className={styles.userText} role="text">
                            <span className={styles.userFirst}>Javier</span>
                            <span className={styles.userLast}>Estorquem</span>
                        </div>

                        <button
                            type="button"
                            id={`${userPopoverId}-btn`}
                            className={styles.avatar}
                            aria-haspopup="menu"
                            aria-controls={userPopoverId}
                            popoverTarget={userPopoverId}
                            ref={userBtnRef}
                        >
                            JE
                        </button>

                        <div
                            id={userPopoverId}
                            className={styles.userMenuPopover}
                            role="menu"
                            aria-label="Menú de usuario"
                            popover="auto"
                            ref={userPopRef}
                        >
                            <div className={styles.userMenuHeader}>
                                <span className={styles.userMenuName}>Javier Estorquem</span>
                            </div>
                            <div className={styles.userMenuDivider} />
                            <div className={styles.userMenuItem} role="menuitem">
                                <span className={styles.userMenuItemLabel}>Tema</span>
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}
