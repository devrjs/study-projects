import { ReactNode } from "react"
import { StyledQuestion } from "./styles"

type QuestionProps = {
  content: string
  author: {
    name: string
    avatar: string
  }
  children?: ReactNode
  isAnswered?: boolean
  isHighlighted?: boolean
}

export function Question({ content, author, isAnswered = false, isHighlighted = false, children }: QuestionProps) {
  return (
    <StyledQuestion className={`${isAnswered ? "answered" : ""} ${isHighlighted && !isAnswered ? "highlighted" : ""}`}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </StyledQuestion>
  )
}
