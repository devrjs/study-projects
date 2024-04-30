import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div>
      landing page
      <Button variant={'ghost'} asChild>
        <Link href="/sign-in">SignIn</Link>
      </Button>
    </div>
  )
}
