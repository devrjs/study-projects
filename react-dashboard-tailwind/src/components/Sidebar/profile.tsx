import { LogOut } from 'lucide-react'
import { Button } from '../Button'

export function Profile() {
  return (
    <div className="flex items-center gap-3">
      <img
        src="https://github.com/devrjs.png"
        className="h-10 w-10 rounded-full"
        alt=""
      />

      <div className="flex flex-1 flex-col overflow-x-hidden">
        <span className="truncate text-sm font-semibold text-zinc-700 dark:text-zinc-100">
          Vitor Gomes
        </span>
        <span className="truncate text-sm text-zinc-500 dark:text-zinc-400">
          vitorjgomes25@gmail.com
        </span>
      </div>

      <Button type="button" variant="ghost">
        <LogOut className="h-5 w-5" />
      </Button>
    </div>
  )
}
