import React, { createContext, SetStateAction } from "react"

type ThemeProps = {
  theme: string
  setTheme: React.Dispatch<SetStateAction<string>>
}

export const ThemeContext = createContext<ThemeProps>({
  theme: "",
  setTheme: () => {},
})
