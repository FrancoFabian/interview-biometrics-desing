// src/components/theme-provider.tsx
import React, { useEffect, useState } from "react";
import { applyTheme, getInitialTheme, type Theme } from "../lib/theme";
import { ThemeContext } from "./theme-context.ts";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

/*
Uso en un toggle:
import { useContext } from "react";
import { ThemeContext } from "./components/theme-provider";

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "Modo claro" : "Modo oscuro"}
    </button>
  );
}


*/
