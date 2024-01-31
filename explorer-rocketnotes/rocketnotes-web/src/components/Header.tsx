import { useAuth } from "@/contexts/AuthContext"
import { api } from "@/services/api"
import { Power } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import avatarPlaceHolder from "../assets/avatar_placeholder.svg"

export function Header() {
  const { signOut, user } = useAuth()

  const avatarUrl = user?.avatar ? `${api.defaults.baseURL}/avatars/${user.avatar}` : avatarPlaceHolder

  return (
    <header className="w-full h-[105px] min-h-[105px] flex justify-between px-20 border-b border-b-popover">
      <Link className="flex items-center gap-4" to="/profile">
        <img src={avatarUrl} alt={user?.name} className="w-14 h-14 rounded-full" />

        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Bem-vindo</span>
          <strong className="text-lg">{user?.name}</strong>
        </div>
      </Link>

      <button onClick={signOut}>
        <Power className="text-4xl text-muted-foreground" />
      </button>
    </header>
  )
}
