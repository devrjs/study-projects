'use client'

import { api } from '@/lib/axios'

export default function Dashboard() {
  api.get('/me', {}).then((res) => console.log(res.data))

  // const response = await api.get('/me', {})
  // console.log(response.data)

  return (
    <div>
      <h1>dashboard</h1>
    </div>
  )
}
