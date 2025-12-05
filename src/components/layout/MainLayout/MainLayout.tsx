import { useState, type ReactNode } from "react";
import { useIsMobile } from "../../../hooks/use-mobile";
import { Navbar } from "../Navbar/Navbar";
import { Sidebar } from "../Sidebar/Sidebar";
import styles from './MainLayout.module.css';

interface MainLayoutProps {
    children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isMobile = useIsMobile();

    return (
        <div className={styles.appLayout}>
            <Navbar onMenuClick={() => setSidebarOpen((v) => !v)} menuOpen={sidebarOpen} />

            <div className={`${styles.appBody} ${sidebarOpen ? styles.withSidebar : styles.noSidebar}`}>
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                <main className={styles.mainContent} style={isMobile ? { padding: 0 } : undefined}>
                    {children}
                </main>
            </div>
        </div>
    );
}
