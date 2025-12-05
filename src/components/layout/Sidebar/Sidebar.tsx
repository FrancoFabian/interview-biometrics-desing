import type { MenuSection } from "../../../types/form-types"
import type { JSX } from "react"
import { useIsMobile } from "../../../hooks/use-mobile" // Adjusted import path
import styles from './Sidebar.module.css'

const menuSections: MenuSection[] = [
    {
        title: "Principal",
        items: [
            { id: "dashboard", label: "Dashboard", icon: "grid", href: "#", active: false },
            { id: "verification", label: "Verificación", icon: "check-circle", href: "#", active: true },
            { id: "records", label: "Registros", icon: "folder", href: "#" },
        ],
    },
    {
        title: "Biométricos",
        items: [
            { id: "fingerprints", label: "Huellas Dactilares", icon: "fingerprint", href: "#" },
            { id: "facial", label: "Reconocimiento Facial", icon: "user", href: "#" },
            { id: "documents", label: "Documentos", icon: "file-text", href: "#" },
        ],
    },
    {
        title: "Administración",
        items: [
            { id: "users", label: "Usuarios", icon: "users", href: "#" },
            { id: "reports", label: "Reportes", icon: "bar-chart", href: "#" },
            { id: "settings", label: "Configuración", icon: "settings", href: "#" },
        ],
    },
]

const icons: Record<string, JSX.Element> = {
    grid: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
        </svg>
    ),
    "check-circle": (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    ),
    folder: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
    ),
    fingerprint: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" />
            <path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2" />
            <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
            <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
            <path d="M8.65 22c.21-.66.45-1.32.57-2" />
            <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
            <path d="M2 16h.01" />
            <path d="M21.8 16c.2-2 .131-5.354 0-6" />
            <path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2" />
        </svg>
    ),
    user: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    ),
    "file-text": (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
        </svg>
    ),
    users: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    "bar-chart": (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="20" x2="12" y2="10" />
            <line x1="18" y1="20" x2="18" y2="4" />
            <line x1="6" y1="20" x2="6" y2="16" />
        </svg>
    ),
    settings: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    ),
}

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const isMobile = useIsMobile()
    return (
        <>
            {isMobile && (
                <div
                    className={`${styles.overlay} ${isOpen ? styles.visible : ""}`}
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}
            <aside
                className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
                role="navigation"
                aria-label="Menú de navegación"
            >
                <div className={styles.header}>
                    <span className={styles.headerTitle}>Menú de navegación</span>
                </div>

                <nav className={styles.nav}>
                    {menuSections.map((section) => (
                        <section key={section.title} className={styles.section}>
                            <h2 className={styles.sectionTitle}>{section.title}</h2>
                            <ul className={styles.menu}>
                                {section.items.map((item) => (
                                    <li key={item.id} className={styles.menuItem}>
                                        <a
                                            href={item.href}
                                            className={`${styles.menuLink} ${item.active ? styles.active : ""}`}
                                        >
                                            <span className={styles.menuIcon}>{icons[item.icon]}</span>
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </nav>
            </aside>
        </>
    )
}
