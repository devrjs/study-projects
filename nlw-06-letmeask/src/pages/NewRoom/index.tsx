import { push, ref, set } from "firebase/database"
import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import homeIllustration from "../../assets/homeIllustration.svg"
import letmeaskLogo from "../../assets/letmeaskLogo.svg"
import { Button } from "../../components/Button"
import { useAuth } from "../../hooks/useAuth"
import { db } from "../../services/firebase"
import { StyledNewRoom } from "./styles"

export function NewRoom() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [newRoom, setNewRoom] = useState("")

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()

    if (newRoom.trim() === "") {
      return
    }

    const firebaseRoom = push(ref(db, "rooms"))

    await set(firebaseRoom, {
      title: newRoom,
      authorId: user?.id,
    })

    navigate(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <StyledNewRoom>
      <aside>
        <img src={homeIllustration} alt="Illustração do chat de usuário" />

        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={letmeaskLogo} alt="Logo do letmeask" />

          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </StyledNewRoom>
  )
}
