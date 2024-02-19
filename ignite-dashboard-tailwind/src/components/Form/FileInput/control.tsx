'use client'

import { ChangeEvent, ComponentProps } from 'react'
import { useFileInput } from './root'

type FileInputControlProps = ComponentProps<'input'>

export function Control({ multiple = false, ...props }: FileInputControlProps) {
  const { id, onFilesSelected } = useFileInput()

  function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) {
      return
    }

    const files = Array.from(event.target.files)

    onFilesSelected(files, multiple)
  }

  return (
    <input
      type="file"
      className="sr-only"
      onChange={handleFilesSelected}
      id={id}
      multiple={multiple}
      {...props}
    />
  )
}
