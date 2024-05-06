'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { api } from '@/lib/axios'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import googleLogo from '@/assets/logo-google.svg'
import Link from 'next/link'

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: 'Mínimo 6 caracteres.' }),
})

type AuthSchema = z.infer<typeof authSchema>

export function UserAuthForm() {
  const [isLoading, setIsLoading] = useState<
    '' | 'credentials' | 'google' | 'github'
  >('')
  const router = useRouter()

  const { register, handleSubmit, formState } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  })

  async function onSubmit({ email, password }: AuthSchema) {
    setIsLoading('credentials')

    try {
      await signIn('credentials', { email, password, redirect: false })

      router.push('/dashboard')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading('')
    }
  }

  async function handleGoogleSignIn() {}

  async function handleGithubSignIn() {
    setIsLoading('github')

    try {
      const response = await api.patch('/token/refresh', {})

      console.log(response)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading('')
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              placeholder="nome@exemplo.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={!!isLoading || formState.isSubmitting}
              {...register('email')}
            />
            <label className="sr-only" htmlFor="email">
              Senha
            </label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={!!isLoading || formState.isSubmitting}
              {...register('password')}
            />
          </div>
          <Button
            type="submit"
            disabled={!!isLoading || formState.isSubmitting}
          >
            {isLoading === 'credentials' ? (
              <span className="loader size-4 animate-spin" />
            ) : (
              'Entrar com e-mail'
            )}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="rounded-full bg-background px-1.5 py-0.5 text-muted-foreground">
            Ou
          </span>
        </div>
      </div>

      <div className="grid gap-2">
        <Button
          variant="outline"
          type="button"
          onClick={handleGoogleSignIn}
          disabled={true /* !!isLoading || formState.isSubmitting */}
        >
          {isLoading === 'google' ? (
            <span className="loader size-4 animate-spin" />
          ) : (
            <>
              <Image
                src={googleLogo}
                width={0}
                height={0}
                alt="Logo do google"
                className="mr-2 size-4"
              />
              Entrar com Google
            </>
          )}
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={handleGithubSignIn}
          disabled={!!isLoading || formState.isSubmitting}
          asChild
        >
          <Link
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
          >
            {isLoading === 'github' ? (
              <span className="loader size-4 animate-spin" />
            ) : (
              <>
                <GitHubLogoIcon className="mr-2 h-4 w-4" />
                Entrar com GitHub
              </>
            )}
          </Link>
        </Button>
      </div>
    </div>
  )
}
