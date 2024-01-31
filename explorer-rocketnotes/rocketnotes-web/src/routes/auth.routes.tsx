import { createBrowserRouter } from "react-router-dom"
import { SignIn } from "../pages/SignIn"
import { SignUp } from "../pages/SignUp"

export const AuthRoutes = createBrowserRouter([
  {
    errorElement: (
      <div className="w-full h-screen flex items-center justify-center text-4xl text-center leading-relaxed">
        Error 404. 😕 <br /> página não encontrada.
      </div>
    ),
  },
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  //
  {
    path: "/new",
    element: <div></div>,
  },
  {
    path: "/details/:id",
    element: <div></div>,
  },
  {
    path: "/profile",
    element: <div></div>,
  },
])
