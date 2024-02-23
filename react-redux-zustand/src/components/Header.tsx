import { useCurrentLesson, useStore } from '../zustand-store'

// import { useCurrentLesson } from '../store/slices/player'
// import { useAppSelector } from '../store'

export function Header() {
  // const { currentModule, currentLesson } = useCurrentLesson()
  // const isCourseLoading = useAppSelector((state) => state.player.isLoading)

  // if (isCourseLoading) {
  //   return <h1 className="text-2xl font-bold">Carregando...</h1>
  // }

  const { currentModule, currentLesson } = useCurrentLesson()
  const isLoading = useStore((store) => store.isLoading)

  if (isLoading) {
    return <h1 className="text-2xl font-bold">Carregando...</h1>
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
      <span className="text-sm text-zinc-400">
        Módulo &#34;{currentModule?.title}&#34;
      </span>
    </div>
  )
}
