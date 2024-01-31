import { createBrowserRouter } from "react-router-dom"
import { Details } from "../pages/Details"
import { Home } from "../pages/Home"
import { New } from "../pages/New"
import { Profile } from "../pages/Profile"

export const AppRoutes = createBrowserRouter([
  {
    errorElement: (
      <div className="w-full h-screen flex items-center justify-center text-4xl text-center leading-relaxed">
        Error 404. 😕 <br /> página não encontrada.
      </div>
    ),
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/new",
    element: <New />,
  },
  {
    path: "/details/:id",
    element: <Details />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
])
