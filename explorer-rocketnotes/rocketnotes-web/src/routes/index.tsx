import { useAuth } from "@/contexts/AuthContext"
import { RouterProvider } from "react-router-dom"
import { AppRoutes } from "./app.routes"
import { AuthRoutes } from "./auth.routes"

export function Routes() {
  const { user } = useAuth()

  // const { user } = useAuth()
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   if (user) {
  //     setLoading(false)
  //   }
  // }, [user])

  // if (loading) {
  //   return null // ou retorne um componente de carregamento
  // }

  return <RouterProvider router={user ? AppRoutes : AuthRoutes} />
}
