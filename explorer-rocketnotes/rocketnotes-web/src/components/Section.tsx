import { ReactNode } from "react"

interface SectionProps {
  title: string
  children: ReactNode
}

export function Section({ title, children }: SectionProps) {
  return (
    <div className="flex flex-col gap-6 py-7">
      <h2 className="pb-4 text-muted-foreground text-xl border-b border-popover">{title}</h2>
      {children}
    </div>
  )
}
