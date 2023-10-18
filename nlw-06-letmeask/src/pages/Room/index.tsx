import { push, ref, remove } from "firebase/database"
import { ThumbsUp } from "phosphor-react"
import { FormEvent, useState } from "react"
import { Link, useParams } from "react-router-dom"
import letmeaskLogo from "../../assets/letmeaskLogo.svg"
import { Button } from "../../components/Button"
import { Question } from "../../components/Question"
import { RoomCode } from "../../components/RoomCode"
import { useAuth } from "../../hooks/useAuth"
import { useRoom } from "../../hooks/useRoom"
import { db } from "../../services/firebase"
import { StyledRoom } from "./styles"

export function Room() {
  const { user } = useAuth()
  const params = useParams()
  const [newQuestion, setNewQuestion] = useState("")
  const roomId = params.id
  const { title, questions } = useRoom(roomId as string)

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()

    if (newQuestion.trim() === "") {
      return
    }

    if (!user) {
      throw new Error("you must be logged in")
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    }

    await push(ref(db, `rooms/${roomId}/questions`), question)

    setNewQuestion("")
  }

  async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
    if (likeId) {
      await remove(ref(db, `rooms/${roomId}/questions/${questionId}/likes/${likeId}`))
    } else {
      await push(ref(db, `rooms/${roomId}/questions/${questionId}/likes`), {
        authorId: user?.id,
      })
    }
  }

  return (
    <StyledRoom>
      <header>
        <div className="content">
          <img src={letmeaskLogo} alt="Logo do letmeask" />

          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <Link to="/">faça seu login.</Link>
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <button
                    className={`like-button ${question.likeId ? "liked" : ""}`}
                    type="button"
                    aria-label="Marcar como gostei"
                    onClick={() => handleLikeQuestion(question.id, question.likeId)}
                  >
                    {question.likeCount > 0 && <span>{question.likeCount}</span>}
                    <ThumbsUp size={24} />
                  </button>
                )}
              </Question>
            )
          })}
        </div>
      </main>
    </StyledRoom>
  )
}
