import { Tag } from "./Tag"

export interface TagProps {
  id: number
  name: string
  description: string
  note_id: number
}

interface NoteProps extends React.HTMLAttributes<HTMLButtonElement> {
  title?: string
  tags: Array<TagProps>
}

export function Note({ title, tags, ...props }: NoteProps) {
  return (
    <button className="w-full flex flex-col gap-5 px-6 pt-4 pb-6 bg-card rounded" {...props}>
      <h1 className="w-full text-left font-bold text-2xl text-foreground">{title}</h1>

      {tags && (
        <footer className="w-full flex gap-2">
          {tags.map(tag => (
            <Tag key={tag.id} title={tag.name} />
          ))}
        </footer>
      )}
    </button>
  )
}
