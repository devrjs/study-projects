'use client'

import { useStore } from '@/store'
import { ReactNode, useEffect } from 'react'

export default function FetchUserProvider({
  children,
}: {
  children: ReactNode
}) {
  const { fetchProfile } = useStore((store) => {
    return { fetchProfile: store.fetchProfile }
  })

  useEffect(() => {
    fetchProfile()
    // deslogar
  }, [fetchProfile])

  return <>{children}</>
}
