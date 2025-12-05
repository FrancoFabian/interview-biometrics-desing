import { useState, type ReactNode } from "react";
import { useIsMobile } from "../../hooks/use-mobile";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

interface MainLayoutProps {
    children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isMobile = useIsMobile();

    return (
        <div className="app-layout">
            <Navbar onMenuClick={() => setSidebarOpen((v) => !v)} menuOpen={sidebarOpen} />

            <div className={`app-body ${sidebarOpen ? "with-sidebar" : "no-sidebar"}`}>
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                <main className="main-content" style={isMobile ? { padding: 0 } : undefined}>
                    {children}
                </main>
            </div>
        </div>
    );
}
