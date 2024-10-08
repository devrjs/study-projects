'use server'

import { currentRole } from '@/lib/currentUser'
import { UserRole } from '@prisma/client'

export async function admin() {
  const role = await currentRole()

  if (role === UserRole.ADMIN) {
    return { success: 'Allowed Server Action!' }
  }

  return { error: 'Forbidden Server Action!' }
}
