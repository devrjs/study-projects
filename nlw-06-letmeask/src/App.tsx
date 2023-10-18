import { RouterProvider } from "react-router-dom"
import { Router } from "./Router"
import { AuthContextProvider } from "./contexts/AuthContext"
import { GlobalStyles } from "./global"

export function App() {
  return (
    <AuthContextProvider>
      <GlobalStyles />
      <RouterProvider router={Router} />
    </AuthContextProvider>
  )
}
