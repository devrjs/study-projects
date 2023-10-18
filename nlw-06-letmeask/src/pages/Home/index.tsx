import { get, ref } from "firebase/database"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import googleLogo from "../../assets/googleLogo.svg"
import homeIllustration from "../../assets/homeIllustration.svg"
import letmeaskLogo from "../../assets/letmeaskLogo.svg"
import { Button } from "../../components/Button"
import { useAuth } from "../../hooks/useAuth"
import { db } from "../../services/firebase"
import { StyledHome } from "./styles"

export function Home() {
  const { user, singInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState("")
  const navigate = useNavigate()

  async function handleCreateRoom() {
    if (!user) {
      await singInWithGoogle()
    }

    navigate("/rooms/new")
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    const roomRef = await get(ref(db, `rooms/${roomCode}`))

    if (roomCode.trim() === "") {
      return
    }

    if (!roomRef.exists()) {
      alert("Room does not exists.")
      return
    }

    if (roomRef.val().endedAt) {
      alert("Room already closed.")
      return
    }

    navigate(`/rooms/${roomCode}`)
  }

  return (
    <StyledHome>
      <aside>
        <img src={homeIllustration} alt="Illustração do chat de usuário" />

        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={letmeaskLogo} alt="Logo do letmeask" />

          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleLogo} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </StyledHome>
  )
}
