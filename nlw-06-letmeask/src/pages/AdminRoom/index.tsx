import { ref, remove, update } from "firebase/database"
import { ChatTeardropText, CheckCircle, Trash } from "phosphor-react"
import { useNavigate, useParams } from "react-router-dom"
import letmeaskLogo from "../../assets/letmeaskLogo.svg"
import { Button } from "../../components/Button"
import { Question } from "../../components/Question"
import { RoomCode } from "../../components/RoomCode"
import { useRoom } from "../../hooks/useRoom"
import { db } from "../../services/firebase"
import { StyledAdminRoom } from "./styles"

export function AdminRoom() {
  const params = useParams()
  const navigate = useNavigate()
  const roomId = params.id
  const { title, questions } = useRoom(roomId as string)

  async function handleEndRoom() {
    update(ref(db, `rooms/${roomId}`), {
      endedAt: new Date(),
    })

    navigate("/")
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await remove(ref(db, `rooms/${roomId}/questions/${questionId}`))
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await update(ref(db, `rooms/${roomId}/questions/${questionId}`), {
      isAnswered: true,
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await update(ref(db, `rooms/${roomId}/questions/${questionId}`), {
      isHighlighted: true,
    })
  }

  return (
    <StyledAdminRoom>
      <header>
        <div className="content">
          <img src={letmeaskLogo} alt="Logo do letmeask" />

          <div>
            <RoomCode code={roomId} />
            <Button onClick={handleEndRoom} isOutlined>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

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
                  <>
                    <button type="button" onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                      <CheckCircle size={24} />
                    </button>
                    <button type="button" onClick={() => handleHighlightQuestion(question.id)}>
                      <ChatTeardropText size={24} />
                    </button>
                  </>
                )}
                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                  <Trash size={24} />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </StyledAdminRoom>
  )
}
