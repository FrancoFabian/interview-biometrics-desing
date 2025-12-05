import React from "react"
import type { Theme } from "../lib/theme"

export const ThemeContext = React.createContext<{
  theme: Theme
  setTheme: (t: Theme) => void
}>({ theme: "light", setTheme: () => {} })

