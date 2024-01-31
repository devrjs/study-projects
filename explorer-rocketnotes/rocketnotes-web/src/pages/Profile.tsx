import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import { api } from "@/services/api"
import { ArrowLeft, Camera, EnvelopeSimple, LockSimple, User } from "@phosphor-icons/react"
import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import avatarPlaceHolder from "../assets/avatar_placeholder.svg"

export function Profile() {
  const { user, updateProfile } = useAuth()

  const [name, setName] = useState(user?.name ?? "")
  const [email, setEmail] = useState(user?.email ?? "")
  const [passwordOld, setPasswordOld] = useState("")
  const [passwordNew, setPasswordNew] = useState("")

  const avatarUrl = user?.avatar ? `${api.defaults.baseURL}/avatars/${user.avatar}` : avatarPlaceHolder
  const [avatar, setAvatar] = useState<string | undefined>(avatarUrl)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault()

    await updateProfile({ name, email, password: passwordNew, old_password: passwordOld }, avatarFile)
  }

  function handleChangeAvatar(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    setAvatarFile(files[0])

    const imagePreview = URL.createObjectURL(files[0])
    setAvatar(imagePreview)
  }

  return (
    <div className="w-full flex flex-col items-center">
      <header className="w-full h-36 flex items-center px-28 bg-secondary">
        <Button variant="link" onClick={handleBack}>
          <ArrowLeft className="text-muted-foreground" size={24} />
        </Button>
      </header>

      <form className="w-full max-w-[340px] flex flex-col items-center gap-2 -mt-[5.75rem]">
        <div className="relative w-[186px] h-[186px] mb-8">
          <img className="w-[186px] h-[186px] rounded-full" src={avatar} alt="Foto do usuário" />

          <label
            className="absolute right-[7px] bottom-[7px] w-12 h-12 flex items-center justify-center bg-primary rounded-full cursor-pointer"
            htmlFor="avatar"
          >
            <Camera className="text-secondary" size={28} />

            <input className="hidden" id="avatar" type="file" onChange={handleChangeAvatar} />
          </label>
        </div>

        <Input
          defaultValue={name}
          placeholder="Nome"
          type="text"
          leftIcon={<User />}
          onChange={e => setName(e.target.value)}
        />
        <Input
          defaultValue={email}
          placeholder="E-mail"
          type="email"
          leftIcon={<EnvelopeSimple />}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          containerClass="mt-4"
          placeholder="Senha atual"
          type="password"
          leftIcon={<LockSimple />}
          onChange={e => setPasswordOld(e.target.value)}
        />
        <Input
          placeholder="Nova senha"
          type="password"
          leftIcon={<LockSimple />}
          onChange={e => setPasswordNew(e.target.value)}
        />

        <Button className="w-full mt-4" size="lg" onClick={handleUpdate}>
          Salvar
        </Button>
      </form>
    </div>
  )
}
