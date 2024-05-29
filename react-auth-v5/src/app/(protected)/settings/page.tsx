import { auth, signOut } from '@/lib/auth'

export default async function SettingsPage() {
  const session = await auth()

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <button>Sign Out</button>
      </form>
    </div>
  )
}
