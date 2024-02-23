import { useContext } from "react"
import { ThemeContext } from "../../contexts/ThemeContext"
import { StyledThemeButton } from "./styles"

export function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <StyledThemeButton>
      <label>
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={() => {
            setTheme(theme === "light" ? "dark" : "light")
          }}
        />

        <div className="ball" />
      </label>
    </StyledThemeButton>
  )
}
