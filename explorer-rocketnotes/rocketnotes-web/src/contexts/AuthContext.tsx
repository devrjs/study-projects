import { api } from "@/services/api"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

type UserProps = {
  id: number
  email: string
  name: string
  avatar: string
  created_at: string
  updated_at: string
}

interface SignInCredentials {
  email: string
  password: string
}

interface ProfileProps extends SignInCredentials {
  name: string
  old_password: string
}

interface AuthContextType {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  updateProfile: (newProfile: ProfileProps, avatarFile: File | null) => Promise<void>
  user?: UserProps
}

const AuthContext = createContext({} as AuthContextType)

function AuthProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<UserProps>()

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/sessions", { email, password })
      const { user, token } = response.data

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
      localStorage.setItem("@rocketnotes:token", token)

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
      setData(user)
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possível entrar.")
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@rocketnotes:token")
    localStorage.removeItem("@rocketnotes:user")

    setData(undefined)
  }

  async function updateProfile(newProfile: ProfileProps, avatarFile: File | null) {
    try {
      if (avatarFile) {
        const fileUploadForm = new FormData()
        fileUploadForm.append("avatar", avatarFile)

        await api.patch("/users/avatar", fileUploadForm)
      }

      const response = await api.put("/users", newProfile)
      const user = response.data

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
      setData(user)
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possível atualizar o perfil.")
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token")
    const user = localStorage.getItem("@rocketnotes:user")

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setData(JSON.parse(user))
    }
  }, [])

  return <AuthContext.Provider value={{ signIn, signOut, updateProfile, user: data }}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
