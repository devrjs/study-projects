import { CheckCircle, Lock } from "@phosphor-icons/react"
import dayjs from "dayjs"
import ptBR from "dayjs/locale/pt-br"
import { Link, useParams } from "react-router-dom"

interface LessonProps {
  title: string
  slug: string
  type: "live" | "class"
  availableAt: Date
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>()

  const isLessonAvailable = dayjs(props.availableAt).isBefore()
  const availableDateFormatted = dayjs(props.availableAt).locale(ptBR).format("dddd [•] DD [de] MMMM [•] HH:00[h]")

  const isActiveLesson = slug === props.slug

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">{availableDateFormatted}</span>

      <div
        className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${
          isActiveLesson && "bg-green-500"
        }`}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={`text-sm font-medium flex items-center gap-2 text-blue-500 ${isActiveLesson && "text-white"}`}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span
            className={`text-xs rounded py-[0.125rem] px-2 text-white border font-bold border-green-300 ${
              isActiveLesson && "border-white"
            }`}
          >
            {props.type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>

        <strong className={`mt-5 block text-gray-200 ${isActiveLesson && "text-white"}`}>{props.title}</strong>
      </div>
    </Link>
  )
}
