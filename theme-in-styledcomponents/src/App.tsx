import { ThemeProvider } from "styled-components"
import { ThemeButton } from "./components/ThemeButton"
import { ThemeContext } from "./contexts/ThemeContext"
import { GlobalStyles } from "./global"
import { usePersistedState } from "./hooks/usePersistedState"
import dark from "./themes/dark"
import light from "./themes/light"

export function App() {
  const [theme, setTheme] = usePersistedState("theme", "light")

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={theme === "light" ? light : dark}>
        <GlobalStyles />
        <div
          style={{ display: "flex", width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center" }}
        >
          <ThemeButton />
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

