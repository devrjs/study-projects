import { createBrowserRouter } from "react-router-dom"
import { AdminRoom } from "./pages/AdminRoom"
import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"
import { NotFound } from "./pages/NotFound"
import { Room } from "./pages/Room"

export const Router = createBrowserRouter([
  {
    errorElement: <NotFound />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/rooms/new",
    element: <NewRoom />,
  },
  {
    path: "/rooms/:id",
    element: <Room />,
  },
  {
    path: "/admin/rooms/:id",
    element: <AdminRoom />,
  },
])
