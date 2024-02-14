'use client'

import { api } from '@/lib/axios'
import { FormEvent, useState } from 'react'

export function CreatePoolForm() {
  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('/pools', {
        title: poolTitle,
      })

      const { code } = response.data
      await navigator.clipboard.writeText(code)

      alert(
        'Bolão criado com sucesso, o código foi copiado para a área de transferência!',
      )

      setPoolTitle('')
    } catch (err) {
      console.log(err)
      alert('Falha ao criar um bolão, tente novamente!')
    }
  }

  return (
    <form onSubmit={createPool} className="mt-10 flex gap-2">
      <input
        className="flex-1 rounded border border-gray-600 bg-gray-800 px-6 py-4 text-sm text-gray-100"
        type="text"
        placeholder="Qual nome do seu bolão?"
        onChange={(event) => setPoolTitle(event.target.value)}
        value={poolTitle}
      />
      <button
        className="rounded bg-yellow-500 px-6 py-4 text-sm font-bold uppercase text-gray-900 hover:bg-yellow-700"
        type="submit"
      >
        Criar meu botão
      </button>
    </form>
  )
}
