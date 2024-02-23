import { Loader } from 'lucide-react'
import ReactPlayer from 'react-player'
import { useCurrentLesson, useStore } from '../zustand-store'

// import { useAppDispatch, useAppSelector } from '../store'
// import { next } from '../store/slices/player'

export function Video() {
  // const dispatch = useAppDispatch()
  // const { currentLesson } = useCurrentLesson()
  // const isCourseLoading = useAppSelector((state) => state.player.isLoading)

  // function handlePlayNext() {
  //   dispatch(next())
  // }

  const { currentLesson } = useCurrentLesson()
  const { isCourseLoading, next } = useStore((store) => {
    return {
      isCourseLoading: store.isLoading,
      next: store.next,
    }
  })

  function handlePlayNext() {
    next()
  }

  return (
    <div className="aspect-video w-full bg-zinc-950">
      {isCourseLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader className="h-6 w-6 animate-spin text-zinc-400" />
        </div>
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          playing
          onEnded={handlePlayNext}
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
        />
      )}
    </div>
  )
}
