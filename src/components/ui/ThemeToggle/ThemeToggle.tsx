// src/components/ui/ThemeToggle/ThemeToggle.tsx
// Theme toggle button component extracted from Navbar

import React, { useContext, useCallback } from "react";
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "../../theme-context";
import styles from "./ThemeToggle.module.css";

export interface ThemeToggleProps {
    className?: string;
}

export const ThemeToggle = React.memo(function ThemeToggle({ className }: ThemeToggleProps) {
    const { theme, setTheme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const handleToggle = useCallback(() => {
        setTheme(isDark ? "light" : "dark");
    }, [isDark, setTheme]);

    return (
        <button
            type="button"
            className={`${styles.toggle} ${isDark ? styles.isDark : styles.isLight} ${className || ""}`}
            aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            aria-pressed={isDark}
            onClick={handleToggle}
        >
            <span className={styles.track}>
                <span className={styles.thumb} />
                <span className={styles.icon}>
                    {isDark ? <Moon size={16} /> : <Sun size={16} />}
                </span>
            </span>
        </button>
    );
});
