import styles from "./ExternalLinksRow.module.css";

interface ExternalLink {
    id: string
    label: string
    url: string
}

const links: ExternalLink[] = [
    { id: "ine", label: "INE", url: "#" },
    { id: "curp", label: "CURP", url: "#" },
    { id: "sepomex", label: "SEPOMEX", url: "#" },
    { id: "otros", label: "Otros", url: "#" },
]

export function ExternalLinksRow() {
    return (
        <section className={styles.section}>
            <h3 className={styles.title}>Links Externos</h3>
            <div className={styles.links} aria-label="Enlaces externos">
                {links.map((link) => (
                    <a key={link.id} href={link.url} className={styles.link} target="_blank" rel="noopener noreferrer">
                        <svg
                            className={styles.icon}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        {link.label}
                    </a>
                ))}
            </div>
        </section>
    )
}
