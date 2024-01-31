import { Plus, X } from "@phosphor-icons/react"

interface NoteItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isNew?: boolean
  value?: string
  onClick: () => void
}

export function NoteItem({ isNew, value, onClick, ...props }: NoteItemProps) {
  return (
    <div
      className={`flex items-center pr-4 rounded-md ${
        isNew ? "bg-transparent border border-dashed border-ring" : "bg-secondary"
      }`}
    >
      <input
        className="w-full h-12 px-3 bg-transparent outline-none placeholder:text-muted-foreground"
        type="text"
        value={value}
        readOnly={!isNew}
        {...props}
      />

      <button onClick={onClick} type="button">
        {isNew ? (
          <Plus className="text-primary" size={25} weight="bold" />
        ) : (
          <X className="text-destructive" size={25} weight="bold" />
        )}
      </button>
    </div>
  )
}
